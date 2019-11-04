import _ from 'lodash';
import path from 'path';
import { Model } from '../../database';
import { Error, Profile, Instruments } from '../../dto';
import {
  LocationToCoordinatesMapper,
  CoordinatesToLocationMapper,
  ContactMethodMapper,
  DatabaseInstrumentsMapper,
  FileToBufferMapper
} from '../../mappers';
import { ResizeImage, RemoveImage } from '../../utils';
import ProfileModel from '../../database/model/profile/model';

const generateDTOFromDatabase = model => {
  const {
    cuid,
    name,
    contactMe,
    location,
    friendlyLocation,
    instruments,
    videos,
    description,
    photo
  } = model;
  const locationDTO = CoordinatesToLocationMapper(location);
  const contactDTO = ContactMethodMapper(contactMe);
  return Profile.DTO(
    cuid,
    name,
    locationDTO,
    friendlyLocation,
    contactDTO,
    instruments,
    videos,
    description,
    photo
  );
};

const controller = {};

controller.provide = async identifier => {
  const model = await Model.Profile.getByCUID(identifier);

  if (_.isNil(model)) {
    throw Error.DTO(Error.CODE_LOGIC_ERROR, Error.ECODE_ITEM_NOT_FOUND, Error.MSG_ITEM_NOT_FOUND);
  }

  return generateDTOFromDatabase(model);
};

controller.update = async (cuid, model) => {
  const dbModel = model;
  const { instruments, location } = model;

  dbModel.instruments = DatabaseInstrumentsMapper(instruments);
  dbModel.location = LocationToCoordinatesMapper(location);

  await Model.Profile.updateData(cuid, _.omitBy(dbModel, _.isNil));
  return controller.provide(cuid);
};

controller.instruments = () => {
  return Instruments.DTO(Profile.INSTRUMENTS);
};

controller.updateAvatar = async (cuid, file) => {
  const avatarDir = path.resolve('./public/img');
  const buffer = FileToBufferMapper(file);

  await RemoveImage(avatarDir, cuid);
  const filename = await ResizeImage(avatarDir, cuid, buffer);

  const query = { photo: path.relative('./public', filename) };

  const profile = await controller.update(cuid, query);
  return profile;
};

controller.search = async (name, instruments, location, friendlyLocation, limit, offset) => {
  const filter = {};
  if (!_.isNil(name)) filter.name = new RegExp(`^${name.toLowerCase()}`, 'i');
  if (!_.isNil(instruments)) {
    const array = instruments.split(',');
    filter.instruments = { $in: array };
  }
  if (!_.isNil(friendlyLocation))
    filter.friendlyLocation = new RegExp(`^${friendlyLocation.toLowerCase()}`, 'i');
  return ProfileModel.search(filter, limit, offset);
};

export default controller;
