import _ from 'lodash';
import { Profile, Local } from '../../database/model';
import { ListDTO } from '../../dto';
import { ProfileDBToDTOMapper, LocalDBToDTOMapper } from '../../mappers';

const controller = {};

controller.searchProfile = async (
  cuid,
  name,
  instruments,
  lat,
  long,
  maxDistance,
  friendlyLocation,
  limit,
  offset
) => {
  let filter = {};
  if (!_.isNil(cuid)) {
    filter.cuid = { $ne: cuid };
  }

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

  if (!_.isNil(lat) && !_.isNil(long) && !_.isNil(maxDistance)) {
    filter = {
      ...filter,
      location: {
        $geoWithin: {
          $centerSphere: [[parseFloat(lat), parseFloat(long)], parseFloat(maxDistance) / 6378.1]
        }
      }
    };
  }

  const { docs, totalDocs } = await Profile.search(filter, limit, offset);
  return ListDTO(totalDocs, offset, docs.map(item => ProfileDBToDTOMapper(item)));
};

controller.searchLocal = async (name, lat, long, maxDistance, price, limit, offset) => {
  let filter = {};

  if (!_.isNil(name)) {
    filter.name = new RegExp(`^${name.toLowerCase()}`, 'i');
  }

  if (!_.isNil(price)) {
    filter.price = { $lte: price };
  }

  if (!_.isNil(lat) && !_.isNil(long) && !_.isNil(maxDistance)) {
    filter = {
      ...filter,
      location: {
        $geoWithin: {
          $centerSphere: [[parseFloat(lat), parseFloat(long)], parseFloat(maxDistance) / 6378.1]
        }
      }
    };
  }

  const { docs, totalDocs } = await Local.search(filter, limit, offset);
  return ListDTO(totalDocs, offset, docs.map(item => LocalDBToDTOMapper(item)));
};

export default controller;
