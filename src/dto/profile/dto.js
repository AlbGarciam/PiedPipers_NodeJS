import _ from 'lodash';

const DTO = (
  cuid,
  name,
  location,
  friendlyLocation,
  contact,
  instruments,
  videos,
  description,
  photo
) => {
  const model = {
    cuid,
    name,
    location,
    friendlyLocation,
    contact,
    instruments,
    videos,
    description,
    photo
  };
  return _.omitBy(model, _.isNil);
};

export { DTO };

const INSTRUMENTS = ['guitarra', 'bateria', 'bajo'];

export { INSTRUMENTS };
