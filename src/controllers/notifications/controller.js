import { Notification } from '../../database/model';
import { List } from '../../dto';
import { NOTIFICATION_TYPES } from '../../constants';

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
  return notification;
  // In a future here we have to send the notification to firebase
};

controller.list = async (userId, limit = 10, offset = 0) => {
  const { docs, totalDocs } = await Notification.getByDestination(userId, limit, offset);
  return List.DTO(totalDocs, offset, docs);
};

controller.remove = async cuid => {
  return Notification.clean(cuid);
};
export default controller;
