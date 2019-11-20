import _ from 'lodash';
import Cuid from 'cuid';
import { Local } from '../../database/model';
import { LocationToCoordinatesMapper, LocalDBToDTOMapper, FileToBufferMapper } from '../../mappers';
import { Error } from '../../dto';
import { RemoveImage, ResizeImage, GetFilename } from '../../utils';
import { PATH } from '../../constants';

const controller = {};

controller.provide = async identifier => {
  const model = await Local.getByCUID(identifier);

  if (_.isNil(model)) {
    throw Error.Builder.ITEM_NOT_FOUND;
  }
  return LocalDBToDTOMapper(model);
};

controller.create = async (name, location, price, contact, photos, description) => {
  // It is not necessary to check each field because db will throw an error
  const cuid = Cuid();
  const model = {
    cuid,
    location: LocationToCoordinatesMapper(location),
    name,
    price,
    contact,
    photos,
    description
  };
  const local = await Local.create(model);
  return LocalDBToDTOMapper(local);
};

controller.update = async (cuid, model) => {
  const dbModel = model;
  const { location } = model;
  dbModel.location = LocationToCoordinatesMapper(location);
  await Local.updateData(cuid, _.omitBy(dbModel, _.isNil));
  return controller.provide(cuid);
};

controller.remove = async cuid => {
  const local = await Local.getByCUID(cuid);
  (local.photos || []).forEach(async element => {
    await RemoveImage(PATH.IMAGES_PATH, element);
  });
  await Local.clean(cuid);
};

controller.insertImage = async (cuid, file) => {
  const buffer = FileToBufferMapper(file);
  const imageUID = Cuid();
  const imageId = `${cuid}____${imageUID}`;
  await Local.insertImage(cuid, imageId);

  await RemoveImage(PATH.IMAGES_PATH, imageId);
  await ResizeImage(PATH.IMAGES_PATH, imageId, buffer);

  return controller.provide(cuid);
};

controller.removeImage = async (cuid, image) => {
  const filename = GetFilename(image);

  console.log(`Remove image!!!!=> ${filename}`);
  await Local.removeImage(cuid, filename);
  await RemoveImage(PATH.IMAGES_PATH, filename);
  return controller.provide(cuid);
};

export default controller;
