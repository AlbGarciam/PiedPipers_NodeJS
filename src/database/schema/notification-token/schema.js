import { Schema } from 'mongoose';

export default Schema(
  {
    token: {
      type: String,
      unique: true,
      required: true,
      dropDups: true,
      index: true
    },
    user: { type: String, required: true, index: true }
  },
  { collection: 'NotificationTokens' }
);
