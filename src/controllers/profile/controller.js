import _ from 'lodash';
import { Model } from '../../database';
import { Error, List } from '../../dto';
import {
  LocationToCoordinatesMapper,
  DatabaseInstrumentsMapper,
  FileToBufferMapper,
  ProfileDBToDTOMapper
} from '../../mappers';
import { ResizeImage, RemoveImage } from '../../utils';
import { PATH, INSTRUMENTS } from '../../constants';

const controller = {};

controller.provide = async identifier => {
  const model = await Model.Profile.getByCUID(identifier);

  if (_.isNil(model)) {
    throw Error.Builder.ITEM_NOT_FOUND;
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
  const instruments = DatabaseInstrumentsMapper(INSTRUMENTS);
  return List.DTO(instruments.length, 0, instruments);
};

controller.updateAvatar = async (cuid, file) => {
  const buffer = FileToBufferMapper(file);

  await RemoveImage(PATH.IMAGES_PATH, cuid);
  const filename = await ResizeImage(PATH.IMAGES_PATH, cuid, buffer);

  const query = { photo: PATH.relative(filename) };

  const profile = await controller.update(cuid, query);
  return profile;
};

controller.remove = async cuid => {
  await RemoveImage(PATH.IMAGES_PATH, cuid);
  await Model.Profile.clean(cuid);
};

export default controller;
