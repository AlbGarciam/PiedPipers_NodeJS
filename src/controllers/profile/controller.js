import { Model } from "../../database";
import { Error, Profile, ContactMehtod, Instruments } from "../../dto";
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
  console.log(model);
  return Profile.DTO(
    model.cuid,
    model.name,
    model.location,
    contact,
    model.instruments,
    model.videos,
    model.description,
    model.photo
  );
};

controller.update = async (cuid, model) => {
  const { instruments } = model;
  if (!_.isNil(instruments)) {
    const filtered = instruments
      .map(item => item.toLowerCase())
      .filter(item => controller.instruments().includes(item.toLowerCase()));
    console.log(filtered);
    if (filtered.length !== instruments.length) {
      throw Error.DTO(
        Error.CODE_VALIDATION_ERROR,
        Error.ECODE_VALIDATION_ERROR,
        Error.MSG_INVALID_INSTRUMENTS_ERROR
      );
    }
  }
  await Model.Profile.updateData(cuid, _.omitBy(model, _.isNil));
  return controller.get(cuid);
};

controller.instruments = () => {
  return Instruments.DTO(Profile.INSTRUMENTS);
};

export default controller;
