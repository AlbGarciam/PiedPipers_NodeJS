import { Notification } from '../../database/model';
import { List } from '../../dto';

const controller = {};

controller.createFollow = async (origin, destination) => {
  await Notification.createFollow(origin, destination);
  // In a future here we have to send the notification to firebase
};

controller.notificationsForUser = async (userId, limit = 10, offset = 0) => {
  const { docs, totalDocs } = await Notification.search(userId, limit, offset);
  return List.DTO(totalDocs, offset, docs);
};

export default controller;
