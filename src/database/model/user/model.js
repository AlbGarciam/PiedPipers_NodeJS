import { Schema, Model } from "mongoose";
import Cuid from "cuid";
import { HashItem, GenerateSalt } from "../../../utils";

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

const UserModel = Model("User", UserSchema);

UserModel.getByEmail = email => {
  return UserModel.findOne({ email: email }).select(
    "name password username cuid dateAdded salt -_id"
  );
};

UserModel.createUser = model => {
  return model.save();
};

export default UserModel;

/**
  const salt = GenerateSalt();
  const hashedPwd = HashItem(password, salt);

  var model = {};
  model.email = email;
  model.password = hashedPwd;
  model.cuid = Cuid();
  model.salt = salt;
 */
