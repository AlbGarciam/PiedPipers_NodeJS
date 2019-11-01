import _ from 'lodash';
import { Location } from '../../dto';

export default model => {
  if (_.isNil(model)) {
    return null;
  }
  const { coordinates } = model.location;
  return Location.DTO(coordinates[0], coordinates[1]);
};
