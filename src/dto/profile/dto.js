import _ from 'lodash';
/** DTO representing a profile on database
 * @namespace Profile
 * @alias Profile
 * @memberof module:DataTransferObject
 * @property {string} cuid Profile's unique identifier
 * @property {string} dateAdded Profile's registration date (yyyy-MM-dd'T'HH:mm:ss.SSS'Z')
 * @property {string} name Profile's name
 * @property {Location} location Profile's location
 * @property {string} friendlyLocation Profile's friendly location
 * @property {ContactMethod} contact Profile's contact method
 * @property {string[]} instruments Profile's skills
 * @property {Video[]} videos Profile's videos
 * @property {string} description Profile's description
 * @property {string} photo Profile's avatar
 * @property {string[]} followers Profile's follower
 * @property {string[]} invitations Profile's pending invitations
 */
export default (
  cuid,
  name,
  location,
  friendlyLocation,
  contact,
  instruments,
  videos,
  description,
  photo,
  followers,
  invitations
) => {
  const model = {
    cuid,
    name,
    location,
    friendlyLocation,
    contact,
    instruments,
    videos,
    description,
    photo,
    followers,
    invitations
  };
  return _.omitBy(model, _.isNil);
};
