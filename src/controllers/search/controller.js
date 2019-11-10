import _ from 'lodash';
import { Profile, Local } from '../../database/model';
import { List } from '../../dto';
import { ProfileDBToDTOMapper } from '../../mappers';

const controller = {};

controller.searchProfile = async (
  name,
  instruments,
  lat,
  long,
  friendlyLocation,
  limit,
  offset
) => {
  let filter = {};
  if (!_.isNil(name)) {
    filter.name = new RegExp(`^${name.toLowerCase()}`, 'i');
  } else {
    filter.name = { $exists: true };
  }

  if (!_.isNil(instruments)) {
    const array = instruments.split(',').map(item => item.toLowerCase());
    filter.instruments = { $in: array };
  }

  if (!_.isNil(friendlyLocation))
    filter.friendlyLocation = new RegExp(`^${friendlyLocation.toLowerCase()}`, 'i');

  if (!_.isNil(lat) && !_.isNil(long)) {
    filter = {
      ...filter,
      location: {
        $geoWithin: { $centerSphere: [[parseFloat(lat), parseFloat(long)], 10 / 6378.1] }
      }
    };
    // 10 km
  }

  const { docs, totalDocs } = await Profile.search(filter, limit, offset);
  return List.DTO(totalDocs, offset, docs.map(item => ProfileDBToDTOMapper(item)));
};

controller.searchLocal = async (name, lat, long, price, limit, offset) => {
  let filter = {};

  if (!_.isNil(name)) {
    filter.name = new RegExp(`^${name.toLowerCase()}`, 'i');
  }

  if (!_.isNil(price)) {
    filter.price = { $lte: price };
  }

  if (!_.isNil(lat) && !_.isNil(long)) {
    filter = {
      ...filter,
      location: {
        $geoWithin: { $centerSphere: [[parseFloat(lat), parseFloat(long)], 10 / 6378.1] }
      }
    };
    // 10 km
  }

  const { docs, totalDocs } = await Local.search(filter, limit, offset);
  return List.DTO(totalDocs, offset, docs.map(item => ProfileDBToDTOMapper(item)));
};

export default controller;
