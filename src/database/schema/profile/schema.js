import { Schema } from 'mongoose';
import { INSTRUMENTS } from '../../../constants';
import PositionSchema from '../position';
import ContactMethodSchema from '../contact-method';

export default Schema(
  {
    cuid: {
      type: String,
      unique: true,
      required: true,
      dropDups: true,
      index: true
    },
    dateAdded: { type: 'Date', default: Date.now, required: true },
    name: { type: String, index: true },
    location: { type: PositionSchema },
    friendlyLocation: { type: String },
    contactMe: { type: ContactMethodSchema },
    instruments: {
      type: [String],
      enum: INSTRUMENTS
    },
    photo: { type: String },
    videos: [{ type: String }],
    description: { type: String },
    invitations: { type: [String], default: [], required: true },
    followers: { type: [String], default: [], required: true }
  },
  { collection: 'Profile' }
);
