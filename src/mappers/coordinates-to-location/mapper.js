import _ from 'lodash';
import { LocationDTO } from '../../dto';

export default model => {
  if (!_.isNil(model) && !_.isNil(model.coordinates)) {
    const { coordinates } = model;
    return LocationDTO(coordinates[0], coordinates[1]);
  }
  return null;
};
