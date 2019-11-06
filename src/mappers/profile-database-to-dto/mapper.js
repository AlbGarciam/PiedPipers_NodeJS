import _ from 'lodash';
import CoordinatesToLocationMapper from '../coordinates-to-location';
import ContactMethodMapper from '../contact-method';
import { Profile } from '../../dto';

export default model => {
  if (_.isNil(model)) {
    return null;
  }
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
