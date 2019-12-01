import _ from 'lodash';
import { Notification } from '../../database/model';
import { ListDTO, Error } from '../../dto';
import { NOTIFICATION_TYPES, NOTIFICATION_STATES } from '../../constants';
import { NotificationDBToDTOMapper } from '../../mappers';

const controller = {};

controller.provide = async cuid => {
  const model = await Notification.getByCUID(cuid);

  if (_.isNil(model)) {
    throw Error.Builder.ITEM_NOT_FOUND;
  }

  return NotificationDBToDTOMapper(model);
};

controller.update = async (cuid, model) => {
  await Notification.updateData(cuid, _.omitBy(model, _.isNil));
  return controller.provide(cuid);
};

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

controller.redeem = async cuid => {
  const notification = await controller.provide(cuid);

  if (notification.state === NOTIFICATION_STATES.REDEEMED) {
    throw Error.Builder.NOTIFICATION_ALREADY_REDEEMED;
  }

  return controller.update(cuid, { state: NOTIFICATION_STATES.REDEEMED });
};

controller.remove = async cuid => {
  return Notification.clean(cuid);
};
export default controller;
