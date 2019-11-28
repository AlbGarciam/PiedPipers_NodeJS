import _ from 'lodash';
import { NotificationDTO } from '../../dto';

export default model => {
  if (_.isNil(model)) {
    return null;
  }
  const { cuid, notificationType, destination, dateAdded, state, data } = model;
  return NotificationDTO(cuid, notificationType, destination, dateAdded, state, data);
};
