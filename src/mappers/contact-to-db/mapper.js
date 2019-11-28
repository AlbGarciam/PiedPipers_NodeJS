import _ from 'lodash';
import { ValidateEmail, ValidatePhone } from '../../utils';
import { CONTACT_METHOD_TYPES } from '../../constants';

export default model => {
  if (_.isNil(model)) {
    return null;
  }

  if (ValidateEmail(model)) {
    return {
      type: CONTACT_METHOD_TYPES.EMAIL,
      data: model
    };
  }

  if (ValidatePhone(model)) {
    return {
      type: CONTACT_METHOD_TYPES.PHONE,
      data: model
    };
  }

  return null;
};
