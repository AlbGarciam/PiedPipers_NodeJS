import _ from 'lodash';
import { Model } from '../../database';
import { Error, Profile, ContactMehtod, Instruments, Location } from '../../dto';
import { ValidateInstruments } from '../../utils';
import { LocationToCoordinatesMapper } from '../../mappers';

const controller = {};

controller.provide = async identifier => {
  let contact = null;
  let location = null;

  const model = await Model.Profile.getByCUID(identifier);
  if (_.isNil(model)) {
    throw Error.DTO(Error.CODE_LOGIC_ERROR, Error.ECODE_ITEM_NOT_FOUND, Error.MSG_ITEM_NOT_FOUND);
  }
  if (!_.isNil(model.contactMe)) {
    const { type, data } = model.contactMe;
    contact = ContactMehtod.DTO(type, data);
  }
  if (!_.isNil(model.location)) {
    const { coordinates } = model.location;
    location = Location.DTO(coordinates[0], coordinates[1]);
  }

  return Profile.DTO(
    model.cuid,
    model.name,
    location,
    contact,
    model.instruments,
    model.videos,
    model.description,
    model.photo
  );
};

controller.update = async (cuid, model) => {
  const dbModel = model;
  const { instruments, location } = model;
  if (!_.isNil(instruments)) {
    const lowerCasedInstruments = instruments.map(item => item.toLowerCase());
    if (!ValidateInstruments(lowerCasedInstruments)) {
      throw Error.DTO(
        Error.CODE_VALIDATION_ERROR,
        Error.ECODE_VALIDATION_ERROR,
        Error.MSG_INVALID_INSTRUMENTS_ERROR
      );
    }
    dbModel.instruments = lowerCasedInstruments;
  }

  if (!_.isNil(location)) {
    const coordinates = LocationToCoordinatesMapper(location);
    if (_.isNil(coordinates)) {
      throw Error.DTO(
        Error.CODE_VALIDATION_ERROR,
        Error.ECODE_VALIDATION_ERROR,
        Error.MSG_INVALID_LOCATION_ERROR
      );
    }
    dbModel.location = coordinates;
  }

  await Model.Profile.updateData(cuid, _.omitBy(dbModel, _.isNil));
  return controller.provide(cuid);
};

controller.instruments = () => {
  return Instruments.DTO(Profile.INSTRUMENTS);
};

export default controller;
