/**
 * @namespace Routes
 * @property {module:routes/user} UserRouter Prepares routes for users
 * @property {module:routes/profile} ProfileRouter Prepares routes for profiles
 * @property {module:routes/local} LocalRouter Prepares routes for locals
 * @property {module:routes/search} SearchRouter Prepares routes for searchs
 * @property {module:routes/notification} NotificationRouter Prepares routes for notifications
 */
import * as Error from './error';
import UserDTO from './user';
import LocationDTO from './location';
import ContactMehtodDTO from './contact-method';
import ProfileDTO from './profile';
import InstrumentsDTO from './instruments';
import ListDTO from './list';
import LocalDTO from './local';
import VideoDTO from './video';
import NotificationDTO from './notification';

export {
  Error,
  UserDTO,
  LocationDTO,
  ContactMehtodDTO,
  ProfileDTO,
  InstrumentsDTO,
  ListDTO,
  LocalDTO,
  VideoDTO,
  NotificationDTO
};
