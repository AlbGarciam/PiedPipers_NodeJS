import _ from 'lodash';

export default (
  cuid,
  name,
  location,
  friendlyLocation,
  contact,
  instruments,
  videos,
  description,
  photo,
  followers,
  invitations
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
    photo,
    followers,
    invitations
  };
  return _.omitBy(model, _.isNil);
};
