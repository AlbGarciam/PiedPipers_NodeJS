import { Schema, model } from "mongoose";
import { Error } from "../../../dto";

const UserSchema = Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      dropDups: true,
      index: true
    },
    password: { type: String, required: true },
    cuid: {
      type: String,
      unique: true,
      required: true,
      dropDups: true,
      index: true
    },
    salt: { type: String, unique: true, required: true },
    dateAdded: { type: "Date", default: Date.now, required: true }
  },
  { collection: "User" }
);

const UserModel = model("User", UserSchema);

UserModel.getByEmail = async email => {
  try {
    return await UserModel.findOne({ email: email }).select(
      "email password cuid dateAdded salt -_id"
    );
  } catch (err) {
    throw ErrorDTO.DTO(
      ErrorDTO.CODE_SERVER_ERROR,
      ErrorDTO.ECODE_DATABASE_ERROR,
      err.message
    );
  }
};

UserModel.getByCuid = async cuid => {
  try {
    return await UserModel.findOne({ cuid: cuid }).select(
      "email password cuid dateAdded salt -_id"
    );
  } catch (err) {
    throw ErrorDTO.DTO(
      ErrorDTO.CODE_SERVER_ERROR,
      ErrorDTO.ECODE_DATABASE_ERROR,
      err.message
    );
  }
};

UserModel.createUser = async model => {
  try {
    return await model.save();
  } catch (err) {
    if (err.code == 11000) {
      throw Error.DTO(
        Error.CODE_AUTHORIZATION_ERROR,
        Error.ECODE_DUPLICATED_ITEM,
        Error.MSG_DUPLICATED_ITEM
      );
    }
    throw Error.DTO(
      Error.CODE_SERVER_ERROR,
      Error.ECODE_DATABASE_ERROR,
      err.errmsg
    );
  }
};

UserModel.updatePassword = async (cuid, password) => {
  try {
    return await UserModel.updateOne({ cuid: cuid }, { password: password });
  } catch (err) {
    throw ErrorDTO.DTO(
      ErrorDTO.CODE_SERVER_ERROR,
      ErrorDTO.ECODE_DATABASE_ERROR,
      err.message
    );
  }
};

export default UserModel;
