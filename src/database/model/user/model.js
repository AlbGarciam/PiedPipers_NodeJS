import { Schema, model } from "mongoose";

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

UserModel.getByEmail = email => {
  return UserModel.findOne({ email: email }).select(
    "email password cuid dateAdded salt -_id"
  );
};

UserModel.createUser = model => {
  return model.save();
};

export default UserModel;
