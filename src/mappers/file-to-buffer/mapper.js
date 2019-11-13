import _ from 'lodash';
import { Error } from '../../dto';

export default model => {
  if (!_.isNil(model) && !_.isNil(model.buffer)) {
    return model.buffer;
  }
  throw Error.Builder.VALIDATION(Error.MSG_INVALID_IMAGE_BUFFER);
};
