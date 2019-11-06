import { Schema } from 'mongoose';
import { ContactMehtod } from '../../../dto';

export default Schema({
  type: {
    type: String,
    enum: [ContactMehtod.PHONE, ContactMehtod.EMAIL],
    required: true
  },
  data: { type: String, required: true }
});
