import _ from 'lodash';
import CoordinatesToLocationMapper from '../coordinates-to-location';
import ContactMethodMapper from '../contact-method';
import VideoIdTODTOMapper from '../video-id-to-dto';
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
  const videoDTO = VideoIdTODTOMapper(videos);
  return Profile.DTO(
    cuid,
    name,
    locationDTO,
    friendlyLocation,
    contactDTO,
    instruments,
    videoDTO,
    description,
    photo
  );
};
