import { Schema } from 'mongoose';
import { CONTACT_METHOD_TYPES } from '../../../constants';

export default Schema({
  type: {
    type: String,
    enum: [CONTACT_METHOD_TYPES.PHONE, CONTACT_METHOD_TYPES.EMAIL],
    required: true
  },
  data: { type: String, required: true }
});
