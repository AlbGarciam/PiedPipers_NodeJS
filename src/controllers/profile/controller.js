import _ from 'lodash';
import { Model } from '../../database';
import { Error, ListDTO } from '../../dto';
import {
  LocationToCoordinatesMapper,
  DatabaseInstrumentsMapper,
  FileToBufferMapper,
  ProfileDBToDTOMapper
} from '../../mappers';
import { ResizeImage, RemoveImage } from '../../utils';
import { PATH, INSTRUMENTS } from '../../constants';

const controller = {};

controller.provide = async identifier => {
  const model = await Model.Profile.getByCUID(identifier);

  if (_.isNil(model)) {
    throw Error.Builder.ITEM_NOT_FOUND;
  }

  return ProfileDBToDTOMapper(model);
};

controller.update = async (cuid, model) => {
  const dbModel = model;
  const { instruments, location } = model;

  dbModel.instruments = DatabaseInstrumentsMapper(instruments);
  dbModel.location = LocationToCoordinatesMapper(location);

  await Model.Profile.updateData(cuid, _.omitBy(dbModel, _.isNil));
  return controller.provide(cuid);
};

controller.instruments = () => {
  const instruments = DatabaseInstrumentsMapper(INSTRUMENTS);
  return ListDTO(instruments.length, 0, instruments);
};

controller.updateAvatar = async (cuid, file) => {
  const buffer = FileToBufferMapper(file);

  await RemoveImage(PATH.IMAGES_PATH, cuid);
  const filename = await ResizeImage(PATH.IMAGES_PATH, cuid, buffer);

  const query = { photo: PATH.relative(filename) };

  const profile = await controller.update(cuid, query);
  return profile;
};

controller.remove = async cuid => {
  await RemoveImage(PATH.IMAGES_PATH, cuid);
  await Model.Profile.clean(cuid);
};

controller.appendInvite = async (origin, destination) => {
  const { cuid, invitations = [] } = origin;
  invitations.push(destination);
  return controller.update(cuid, { invitations });
};

controller.finalizeFollow = async notificationData => {
  const { origin, destination } = notificationData;
  const originUser = await controller.provide(origin);
  const destinationUser = await controller.provide(destination);

  // Update origin ( move from invites to followers )
  const { invitations: originInvitations, followers: originFollowers } = originUser;
  originFollowers.push(destination);
  await controller.update(origin, {
    followers: originFollowers,
    invitations: originInvitations.filter(item => item !== destination)
  });

  // Update destination ( add to followers )
  const { followers: destFollowers } = destinationUser;
  destFollowers.push(origin);
  await controller.update(destination, { followers: destFollowers });
};

controller.unfollow = async (origin, destination) => {
  const originUser = await controller.provide(origin);
  const destinationUser = await controller.provide(destination);

  // Update destination
  const { followers: destFollowers } = destinationUser;
  await controller.update(destination, {
    followers: destFollowers.filter(item => item !== origin)
  });

  // Update origin
  const { followers: originFollowers } = originUser;
  originFollowers.push(destination);

  return controller.update(origin, {
    followers: originFollowers.filter(item => item !== destination)
  });
};

export default controller;
