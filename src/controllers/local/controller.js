import _ from 'lodash';
import Cuid from 'cuid';
import { Local } from '../../database/model';
import { LocationToCoordinatesMapper, LocalDBToDTOMapper } from '../../mappers';

const controller = {};

controller.provide = async identifier => {
  const model = await Local.getByCUID(identifier);

  if (_.isNil(model)) {
    throw Error.DTO(Error.CODE_LOGIC_ERROR, Error.ECODE_ITEM_NOT_FOUND, Error.MSG_ITEM_NOT_FOUND);
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
  console.log('UPDATE!!!');
  const dbModel = model;
  const { location } = model;
  dbModel.location = LocationToCoordinatesMapper(location);

  await Local.updateData(cuid, _.omitBy(dbModel, _.isNil));
  return controller.provide(cuid);
};

export default controller;
