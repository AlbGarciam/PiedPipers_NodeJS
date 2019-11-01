import _ from 'lodash';
import { Error } from '../../dto';

export default model => {
  if (!_.isNil(model) && !_.isNil(model.buffer)) {
    return model.buffer;
  }
  throw Error.DTO(
    Error.CODE_VALIDATION_ERROR,
    Error.ECODE_VALIDATION_ERROR,
    Error.MSG_INVALID_IMAGE_BUFFER
  );
};
