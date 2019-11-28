import _ from 'lodash';

export default (cuid, notificationType, destination, dateAdded, state, data) => {
  const model = {
    cuid,
    notificationType,
    data,
    destination,
    dateAdded,
    state
  };
  return _.omitBy(model, _.isNil);
};
