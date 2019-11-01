import _ from 'lodash';
import { Location } from '../../dto';

export default model => {
  if (!_.isNil(model) && !_.isNil(model.coordinates)) {
    const { coordinates } = model;
    return Location.DTO(coordinates[0], coordinates[1]);
  }
  return null;
};
