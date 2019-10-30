import _ from "lodash";

const locationToCoordinates = model => {
  const { lat, long } = model;
  if (_.isNil(lat) || _.isNil(long)) {
    return null;
  }
  const validValues = lat <= 90 && lat >= -90 && long <= 180 && long >= -180;
  return validValues ? { coordinates: [lat, long] } : null;
};

export default locationToCoordinates;
