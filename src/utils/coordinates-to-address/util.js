import _ from 'lodash';
import axios from 'axios';
import { Error } from '../../dto';
import { ERROR_MSG } from '../../constants';

const API_KEY = process.env.GEO_PROVIDER_KEY;
const PROVIDER = 'api.opencagedata.com/geocode/v1/json';
const route = (lat, long) => {
  return `https://${PROVIDER}?key=${API_KEY}&q=${lat}%2C${long}&pretty=1&no_annotations=1`;
};

export default async (lat, long) => {
  if (!(!_.isNil(lat) && !_.isNil(long) && _.isNumber(lat) && _.isNumber(long))) {
    throw Error.VALIDATION(ERROR_MSG.MSG_INVALID_LOCATION_ERROR);
  }
  try {
    const response = await axios.get(route(lat, long));
    const results = _.get(response, 'data.results', []);
    const formatted = results.map(item => _.get(item, 'formatted'));
    const firstFormatted = _.first(_.compact(formatted));
    if (_.isNil(firstFormatted)) {
      throw Error.VALIDATION(ERROR_MSG.MSG_INVALID_LOCATION_ERROR);
    }
    return firstFormatted;
  } catch (error) {
    throw Error.UNKNOWN(error.message);
  }
};
