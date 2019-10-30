import { Model } from "../../database";
import {
  Error,
  Profile,
  ContactMehtod,
  Instruments,
  Location
} from "../../dto";
import { LocationToCoordinates, ValidateInstruments } from "../../utils";
import _ from "lodash";

const controller = {};

controller.provide = async identifier => {
  const model = await Model.Profile.getByCUID(identifier);
  if (_.isNil(model)) {
    throw Error.DTO(
      Error.CODE_LOGIC_ERROR,
      Error.ECODE_ITEM_NOT_FOUND,
      Error.MSG_ITEM_NOT_FOUND
    );
  }
  var contact = null;
  if (!_.isNil(model.contactMe)) {
    const { type, data } = model.contactMe;
    contact = ContactMehtod.DTO(type, data);
  }
  var location = null;
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
  var { instruments, location } = model;
  if (!_.isNil(instruments)) {
    instruments = instruments.map(item => item.toLowerCase());
    if (!ValidateInstruments(instruments)) {
      throw Error.DTO(
        Error.CODE_VALIDATION_ERROR,
        Error.ECODE_VALIDATION_ERROR,
        Error.MSG_INVALID_INSTRUMENTS_ERROR
      );
    }
    model.instruments = instruments;
  }

  if (!_.isNil(location)) {
    const coordinates = LocationToCoordinates(location);
    if (_.isNil(coordinates)) {
      throw Error.DTO(
        Error.CODE_VALIDATION_ERROR,
        Error.ECODE_VALIDATION_ERROR,
        Error.MSG_INVALID_LOCATION_ERROR
      );
    }
    model.location = coordinates;
  }

  await Model.Profile.updateData(cuid, _.omitBy(model, _.isNil));
  return controller.provide(cuid);
};

controller.instruments = () => {
  return Instruments.DTO(Profile.INSTRUMENTS);
};

export default controller;
