import { Schema } from 'mongoose';

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
    dateAdded: { type: 'Date', default: Date.now, required: true }
  },
  { collection: 'User' }
);

export default UserSchema;
