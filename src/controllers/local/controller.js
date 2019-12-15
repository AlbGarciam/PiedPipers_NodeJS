import _ from 'lodash';
import Cuid from 'cuid';
import { Local } from '../../database/model';
import { LocationToCoordinatesMapper, LocalDBToDTOMapper } from '../../mappers';
import { Error } from '../../dto';
import { RemoveImageFromPath, SaveImage, CoordinatesToAddress } from '../../utils';

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
  const { lat, long } = location;
  const address = await CoordinatesToAddress(lat, long);
  const model = {
    cuid,
    location: LocationToCoordinatesMapper(location),
    name,
    price,
    contact,
    photos,
    description,
    address
  };
  const local = await Local.create(model);
  return LocalDBToDTOMapper(local);
};

controller.update = async (cuid, model) => {
  const dbModel = model;
  const { location } = model;
  if (!_.isNil(location)) {
    const { lat, long } = location;
    dbModel.location = LocationToCoordinatesMapper(location);
    dbModel.address = await CoordinatesToAddress(lat, long);
  }
  await Local.updateData(cuid, _.omitBy(dbModel, _.isNil));
  return controller.provide(cuid);
};

controller.remove = async cuid => {
  const local = await Local.getByCUID(cuid);
  (local.photos || []).forEach(async element => {
    await RemoveImageFromPath(element);
  });
  await Local.clean(cuid);
};

controller.insertImage = async (cuid, file) => {
  const filename = `${cuid}_${Cuid()}`;
  const filepath = await SaveImage(file, filename);
  await Local.insertImage(cuid, filepath);

  return controller.provide(cuid);
};

controller.removeImage = async (cuid, path) => {
  let { photos } = await controller.provide(cuid);
  photos = photos.filter(item => item !== path);
  await RemoveImageFromPath(path);
  return controller.update(cuid, { photos });
};

export default controller;
