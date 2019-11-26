import { Schema } from 'mongoose';
import Cuid from 'cuid';

export default Schema(
  {
    cuid: {
      type: String,
      unique: true,
      required: true,
      dropDups: true,
      index: true,
      default: Cuid()
    },
    dateAdded: { type: 'Date', default: Date.now, required: true },
    destination: { type: String, index: true, required: true },
    notificationType: { type: String, required: true },
    data: {
      type: Schema.Types.Mixed,
      required: true
    }
  },
  { collection: 'Notifications' }
);
