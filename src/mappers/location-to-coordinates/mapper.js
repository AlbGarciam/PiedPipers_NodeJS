import _ from 'lodash';
import { Error } from '../../dto';
import { ERROR_MSG } from '../../constants';

export default model => {
  if (_.isNil(model)) {
    return null;
  }

  const { lat, long } = model;
  if (_.isNil(lat) || _.isNil(long)) {
    return null;
  }

  const validValues = lat <= 90 && lat >= -90 && long <= 180 && long >= -180;

  if (!validValues) {
    throw Error.VALIDATION(ERROR_MSG.MSG_INVALID_LOCATION_ERROR);
  }

  return {
    type: 'Point',
    coordinates: [lat, long]
  };
};
