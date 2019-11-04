import _ from 'lodash';
import { Model } from '../../database';
import { List, Profile } from '../../dto';
import { CoordinatesToLocationMapper, ContactMethodMapper } from '../../mappers';

const controller = {};

const generateDTOFromDatabase = model => {
  const {
    cuid,
    name,
    contactMe,
    location,
    friendlyLocation,
    instruments,
    videos,
    description,
    photo
  } = model;
  const locationDTO = CoordinatesToLocationMapper(location);
  const contactDTO = ContactMethodMapper(contactMe);
  return Profile.DTO(
    cuid,
    name,
    locationDTO,
    friendlyLocation,
    contactDTO,
    instruments,
    videos,
    description,
    photo
  );
};

controller.searchProfile = async (name, instruments, location, friendlyLocation, limit, offset) => {
  const filter = {};
  if (!_.isNil(name)) filter.name = new RegExp(`^${name.toLowerCase()}`, 'i');
  if (!_.isNil(instruments)) {
    const array = instruments.split(',');
    filter.instruments = { $in: array };
  }
  if (!_.isNil(friendlyLocation))
    filter.friendlyLocation = new RegExp(`^${friendlyLocation.toLowerCase()}`, 'i');

  const { docs, totalDocs } = await Model.Profile.search(filter, limit, offset);
  return List.DTO(totalDocs, offset, docs.map(item => generateDTOFromDatabase(item)));
};

export default controller;
