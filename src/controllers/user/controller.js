import { Model } from "../../database";
import { Error as ErrorDTO, User } from "../../dto";
import Cuid from "cuid";
import moment from "moment";
import { ValidateEquality, GenerateSalt, HashItem } from "../../utils";
import _ from "lodash";

const controller = {};

controller.login = async (email, pwd) => {
  const trimmedEmail = email.trim();
  var user = await Model.User.getByEmail(trimmedEmail);
  if (_.isNull(user)) {
    throw ErrorDTO.DTO(
      ErrorDTO.CODE_LOGIC_ERROR,
      ErrorDTO.ECODE_ITEM_NOT_FOUND,
      ErrorDTO.MSG_ITEM_NOT_FOUND
    );
  }
  if (ValidateEquality(user.salt, pwd, user.password)) {
    return User.DTO(user.email, user.cuid, user.dateAdded);
  } else {
    throw ErrorDTO.DTO(
      ErrorDTO.CODE_AUTHORIZATION_ERROR,
      ErrorDTO.ECODE_INVALID_PASSWORD,
      ErrorDTO.MSG_INVALID_PASSWORD
    );
  }
};

controller.create = async (email, pwd) => {
  const salt = GenerateSalt();
  const hashedPwd = HashItem(pwd.trim(), salt);
  const model = Model.User({
    email: email,
    password: hashedPwd,
    cuid: Cuid(),
    salt: salt
  });
  return await Model.User.createUser(model);
};

controller.updatePassword = async (cuid, password, userValidity) => {
  if (moment().isAfter(userValidity)) {
    throw ErrorDTO.DTO(
      ErrorDTO.CODE_AUTHORIZATION_ERROR,
      ErrorDTO.ECODE_LOGIN_REQUIRED,
      ErrorDTO.MSG_LOGIN_REQUIRED
    );
  }
  const { email, salt, dateAdded } = await Model.User.getByCuid(cuid);
  if (_.isNull(salt)) {
    throw ErrorDTO.DTO(
      ErrorDTO.CODE_LOGIC_ERROR,
      ErrorDTO.ECODE_ITEM_NOT_FOUND,
      ErrorDTO.MSG_ITEM_NOT_FOUND
    );
  }
  const hashedPwd = HashItem(password, salt);
  await Model.User.updatePassword(cuid, hashedPwd);
  return User.DTO(email, cuid, dateAdded);
};

export default controller;
