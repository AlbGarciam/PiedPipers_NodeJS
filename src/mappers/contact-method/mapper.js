import _ from 'lodash';
import { ContactMehtod } from '../../dto';

export default model => {
  if (!_.isNil(model) && !_.isNil(model.type) && !_.isNil(model.data)) {
    const { type, data } = model;
    return ContactMehtod.DTO(type, data);
  }
  return null;
};
