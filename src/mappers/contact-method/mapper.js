import _ from 'lodash';
import { ContactMehtodDTO } from '../../dto';

export default model => {
  if (!_.isNil(model) && !_.isNil(model.type) && !_.isNil(model.data)) {
    const { type, data } = model;
    return ContactMehtodDTO(type, data);
  }
  return null;
};
