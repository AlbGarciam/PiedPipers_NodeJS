import _ from 'lodash';
import { Error } from '../../dto';
import { ERROR_MSG } from '../../constants';
import { ValidateInstruments } from '../../utils';

export default model => {
  if (_.isNil(model)) {
    return null;
  }
  const lowerCasedInstruments = model.map(item => item.toLowerCase()).sort();

  if (!ValidateInstruments(lowerCasedInstruments)) {
    throw Error.VALIDATION(ERROR_MSG.MSG_INVALID_INSTRUMENTS_ERROR);
  }

  return lowerCasedInstruments;
};
