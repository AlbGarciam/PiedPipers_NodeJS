import _ from 'lodash';

export default model => {
  const { lat, long } = model;
  if (_.isNil(lat) || _.isNil(long)) {
    return null;
  }
  const validValues = lat <= 90 && lat >= -90 && long <= 180 && long >= -180;
  return validValues ? { coordinates: [lat, long] } : null;
};
