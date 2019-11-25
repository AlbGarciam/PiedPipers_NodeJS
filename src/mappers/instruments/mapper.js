import _ from 'lodash';
import { Error } from '../../dto';
import { ValidateInstruments } from '../../utils';

export default model => {
  if (_.isNil(model)) {
    return null;
  }
  console.error(model);
  const lowerCasedInstruments = model.map(item => item.toLowerCase());

  if (!ValidateInstruments(lowerCasedInstruments)) {
    throw Error.Builder.VALIDATION(Error.MSG_INVALID_INSTRUMENTS_ERROR);
  }

  return lowerCasedInstruments;
};
