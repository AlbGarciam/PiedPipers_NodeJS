import _ from 'lodash';
import path from 'path';
import { Model } from '../../database';
import { Error, Profile, Instruments } from '../../dto';
import {
  LocationToCoordinatesMapper,
  DatabaseInstrumentsMapper,
  FileToBufferMapper,
  ProfileDBToDTOMapper
} from '../../mappers';
import { ResizeImage, RemoveImage } from '../../utils';

const avatarDir = path.resolve('./public/img');

const controller = {};

controller.provide = async identifier => {
  const model = await Model.Profile.getByCUID(identifier);

  if (_.isNil(model)) {
    throw Error.DTO(Error.CODE_LOGIC_ERROR, Error.ECODE_ITEM_NOT_FOUND, Error.MSG_ITEM_NOT_FOUND);
  }

  return ProfileDBToDTOMapper(model);
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
  const buffer = FileToBufferMapper(file);

  await RemoveImage(avatarDir, cuid);
  const filename = await ResizeImage(avatarDir, cuid, buffer);

  const query = { photo: path.relative('./public', filename) };

  const profile = await controller.update(cuid, query);
  return profile;
};

controller.remove = async cuid => {
  await RemoveImage(avatarDir, cuid);
  await Model.Profile.clean(cuid);
};

export default controller;
