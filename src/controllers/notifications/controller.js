import _ from 'lodash';
import Cuid from 'cuid';
import { Notification, NotificationToken } from '../../database/model';
import { ListDTO, Error, NotificationBuilder } from '../../dto';
import { NOTIFICATION_TYPES, NOTIFICATION_STATES } from '../../constants';
import { NotificationDBToDTOMapper } from '../../mappers';
import { SendPush } from '../../utils';

const controller = {};

controller.provide = async cuid => {
  const model = await Notification.getByCUID(cuid);

  if (_.isNil(model)) {
    throw Error.ITEM_NOT_FOUND;
  }

  return NotificationDBToDTOMapper(model);
};

controller.update = async (cuid, model) => {
  await Notification.updateData(cuid, _.omitBy(model, _.isNil));
  return controller.provide(cuid);
};

controller.follow = async (origin, destination) => {
  const { cuid: destinationId, name: destinationName } = destination;
  const { cuid: originId, photo, name: originName } = origin;
  const data = NotificationBuilder.FOLLOW(
    photo || '',
    originId || '',
    originName || '',
    destinationId || '',
    destinationName || ''
  );

  const item = {
    notificationType: NOTIFICATION_TYPES.FOLLOW,
    data
  };

  const notification = await controller.create(destinationId, item);
  SendPush(destinationId, { ...data, notificationType: NOTIFICATION_TYPES.FOLLOW });
  return NotificationDBToDTOMapper(notification);
};

controller.list = async (userId, state, limit = 10, offset = 0) => {
  const query = {
    destination: userId,
    state
  };
  const { docs, totalDocs } = await Notification.search(_.omitBy(query, _.isNil), limit, offset);
  const dtoList = (docs || []).map(item => NotificationDBToDTOMapper(item));
  return ListDTO(totalDocs, offset, dtoList);
};

controller.create = async (destination, data) => {
  const cuid = Cuid();
  return Notification.create(cuid, destination, data);
};

controller.redeem = async cuid => {
  const notification = await controller.provide(cuid);

  if (notification.state === NOTIFICATION_STATES.REDEEMED) {
    throw Error.NOTIFICATION_ALREADY_REDEEMED;
  }

  return controller.update(cuid, { state: NOTIFICATION_STATES.REDEEMED });
};

controller.remove = async cuid => {
  return Notification.clean(cuid);
};

controller.register = async (token, user) => {
  return NotificationToken.register(user, token);
};

controller.unregister = async (token, user) => {
  await NotificationToken.unregister(user, token);
};
export default controller;
