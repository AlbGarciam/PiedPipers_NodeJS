import { Model } from "../../database";
import { Error as ErrorDTO, Profile, ContactMehtod } from "../../dto";
import _ from "lodash";

const controller = {};

controller.get = async identifier => {
  const model = await Model.Profile.getByCUID(identifier);
  if (_.isNil(model)) {
    throw ErrorDTO.DTO(
      ErrorDTO.CODE_LOGIC_ERROR,
      ErrorDTO.ECODE_ITEM_NOT_FOUND,
      ErrorDTO.MSG_ITEM_NOT_FOUND
    );
  }
  var contact = null;
  if (!_.isNil(model.contactMe)) {
    const { type, data } = model.contactMe;
    contact = ContactMehtod.DTO(type, data);
  }

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

export default controller;
