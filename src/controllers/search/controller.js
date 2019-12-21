import _ from 'lodash';
import { Profile, Local } from '../../database/model';
import { ListDTO } from '../../dto';
import { ProfileDBToDTOMapper, LocalDBToDTOMapper } from '../../mappers';
import { CompareRegex } from '../../utils';

const locationQuery = (lat, long, maxDistance) => {
  if (_.isNil(lat) || _.isNil(long) || _.isNil(maxDistance)) return null;
  return {
    $geoWithin: {
      $centerSphere: [[parseFloat(lat), parseFloat(long)], parseFloat(maxDistance) / 6378.1]
    }
  };
};

const controller = {};

controller.searchProfile = async (filter, limit, offset) => {
  const { cuid, name, instruments, lat, long, maxDistance, friendlyLocation } = filter;
  const query = {};

  query.cuid = _.isNil(cuid) ? null : { $ne: cuid };
  query.name = CompareRegex(name) || { $exists: true };
  query.photo = { $exists: true };
  if (!_.isNil(instruments)) {
    const array = instruments.split(',').map(item => item.toLowerCase());
    query.instruments = { $in: array };
  }
  query.friendlyLocation = CompareRegex(friendlyLocation);
  query.location = locationQuery(lat, long, maxDistance);

  const { docs, totalDocs } = await Profile.search(_.omitBy(query, _.isNil), limit, offset);
  return ListDTO(totalDocs, offset, docs.map(item => ProfileDBToDTOMapper(item)));
};

controller.searchLocal = async (filter, limit, offset) => {
  const { name, lat, long, maxDistance, price } = filter;
  const query = {};

  query.name = CompareRegex(name) || { $exists: true };
  query.price = _.isNil(price) ? { $exists: true } : { $lte: price };
  query.location = locationQuery(lat, long, maxDistance);

  const { docs, totalDocs } = await Local.search(_.omitBy(query, _.isNil), limit, offset);
  return ListDTO(totalDocs, offset, docs.map(item => LocalDBToDTOMapper(item)));
};

export default controller;
