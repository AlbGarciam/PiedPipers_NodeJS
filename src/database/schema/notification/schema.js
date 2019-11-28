import { Schema } from 'mongoose';
import Cuid from 'cuid';
import { NOTIFICATION_STATES } from '../../../constants';

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
    state: { type: String, required: true, default: NOTIFICATION_STATES.PENDING },
    data: {
      type: Schema.Types.Mixed,
      required: true
    }
  },
  { collection: 'Notifications' }
);
