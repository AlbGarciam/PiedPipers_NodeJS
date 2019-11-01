import _ from 'lodash';
import { Error } from '../../dto';
import { ValidateInstruments } from '../../utils';

export default model => {
  if (_.isNil(model)) {
    return null;
  }

  const lowerCasedInstruments = model.map(item => item.toLowerCase());

  if (!ValidateInstruments(lowerCasedInstruments)) {
    throw Error.DTO(
      Error.CODE_VALIDATION_ERROR,
      Error.ECODE_VALIDATION_ERROR,
      Error.MSG_INVALID_INSTRUMENTS_ERROR
    );
  }

  return lowerCasedInstruments;
};
