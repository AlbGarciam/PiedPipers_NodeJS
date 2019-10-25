import { Model } from "../../database";
import { Error as ErrorDTO, User } from "../../dto";
import Cuid from "cuid";
import { ValidateEquality, GenerateSalt, HashItem } from "../../utils";
import _ from "lodash";

const controller = {};

controller.login = async (email, pwd) => {
  const trimmedEmail = email.trim();
  var user = null;
  try {
    user = await Model.User.getByEmail(trimmedEmail);
  } catch (err) {
    throw ErrorDTO.DTO(
      ErrorDTO.CODE_SERVER_ERROR,
      ErrorDTO.ECODE_DATABASE_ERROR,
      err.message
    );
  }
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
  console.debug(`Email to create: ${email}`);
  const salt = GenerateSalt();
  const hashedPwd = HashItem(pwd.trim(), salt);
  const model = Model.User({
    email: email,
    password: hashedPwd,
    cuid: Cuid(),
    salt: salt
  });
  try {
    let user = await Model.User.createUser(model);
    return User.DTO(user.email, user.cuid, user.dateAdded);
  } catch (err) {
    throw ErrorDTO.DTO(
      ErrorDTO.CODE_SERVER_ERROR,
      ErrorDTO.ECODE_DATABASE_ERROR,
      err.message
    );
  }
};

export default controller;
