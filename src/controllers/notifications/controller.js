import { Notification } from '../../database/model';
import { ListDTO } from '../../dto';
import { NOTIFICATION_TYPES } from '../../constants';
import { NotificationDBToDTOMapper } from '../../mappers';

const controller = {};

controller.follow = async (origin, destination) => {
  const { cuid: destinationId } = destination;
  const { cuid: originId } = origin;

  const item = {
    notificationType: NOTIFICATION_TYPES.FOLLOW,
    data: {
      origin: originId,
      destination: destinationId
    }
  };

  const notification = await Notification.create(destinationId, item);
  return NotificationDBToDTOMapper(notification);
  // In a future here we have to send the notification to firebase
};

controller.list = async (userId, limit = 10, offset = 0) => {
  const { docs, totalDocs } = await Notification.getByDestination(userId, limit, offset);
  const dtoList = (docs || []).map(item => NotificationDBToDTOMapper(item));
  return ListDTO(totalDocs, offset, dtoList);
};

controller.remove = async cuid => {
  return Notification.clean(cuid);
};
export default controller;
