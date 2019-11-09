import _ from 'lodash';
import { ValidateEmail, ValidatePhone } from '../../utils';
import { ContactMehtod } from '../../dto';

export default model => {
  if (_.isNil(model)) {
    return null;
  }

  if (ValidateEmail(model)) {
    return {
      type: ContactMehtod.EMAIL,
      data: model
    };
  }

  if (ValidatePhone(model)) {
    return {
      type: ContactMehtod.PHONE,
      data: model
    };
  }

  return null;
};
