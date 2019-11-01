import _ from 'lodash';
import { ContactMehtod } from '../../dto';

export default model => {
  if (_.isNil(model)) {
    return null;
  }
  const { type, data } = model.contactMe;
  return ContactMehtod.DTO(type, data);
};
