/**
 * This module represents the entire set of Data transfer objects presents on this backend
 * @module DataTransferObject
 */

/**
 * @namespace DTO
 * @property {module:dto/user} UserDTO Prepares data transfer object for users
 * @property {module:dto/location} LocationDTO Prepares data transfer object for locations
 * @property {module:dto/contact} ContactMehtodDTO Prepares data transfer object for contacts
 * @property {module:dto/profile} ProfileDTO Prepares data transfer object for profiles
 * @property {module:dto/instruments} InstrumentsDTO Prepares data transfer object for instrumentss
 * @property {module:dto/list} ListDTO Prepares data transfer object for lists
 * @property {module:dto/local} LocalDTO Prepares data transfer object for locals
 * @property {module:dto/video} VideoDTO Prepares data transfer object for videos
 * @property {module:dto/notification} NotificationDTO Prepares data transfer object for notifications
 * @property {module:dto/error} ErrorDTO Prepares data transfer object for errors
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
