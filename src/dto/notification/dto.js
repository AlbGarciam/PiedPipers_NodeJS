import _ from 'lodash';

export default (cuid, notificationType, destination, dateAdded, data) => {
  const model = {
    cuid,
    notificationType,
    data,
    destination,
    dateAdded
  };
  return _.omitBy(model, _.isNil);
};
