import { Schema, model } from "mongoose";
import { ContactMehtod } from "../../../dto";
import { Error } from "../../../dto";

const PositionSchema = Schema({
  type: { type: String, enum: ["Point"], required: true },
  coordinates: { type: [Number], required: true }
});

const ContactMethodSchema = Schema({
  type: {
    type: String,
    enum: [ContactMehtod.PHONE, ContactMehtod.EMAIL],
    required: true
  },
  data: { type: String, required: true }
});

const ProfileSchema = Schema(
  {
    cuid: {
      type: String,
      unique: true,
      required: true,
      dropDups: true,
      index: true
    },
    dateAdded: { type: "Date", default: Date.now, required: true },
    name: { type: String, index: true },
    location: { type: PositionSchema, index: true },
    contactMe: { type: ContactMethodSchema },
    instruments: [
      { type: String, enum: ["guitarra", "batería", "contrabajo"] }
    ],
    photo: { type: String },
    videos: [{ type: String }],
    description: { type: String },
    followers: [{ type: String }]
  },
  { collection: "Profile" }
);

const ProfileModel = model("Profile", ProfileSchema);

ProfileModel.create = async cuid => {
  const model = ProfileModel({ cuid });
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

ProfileModel.getByCUID = async cuid => {
  try {
    return await ProfileModel.findOne({ cuid: cuid }).select(
      "cuid dateAdded name location contactMe instruments photo videos description followers -_id"
    );
  } catch (err) {
    throw ErrorDTO.DTO(
      ErrorDTO.CODE_SERVER_ERROR,
      ErrorDTO.ECODE_DATABASE_ERROR,
      err.message
    );
  }
};

export default ProfileModel;
