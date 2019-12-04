import _ from 'lodash';
/** DTO representing notification on database
 * @namespace Notification
 * @alias Notification
 * @memberof module:DataTransferObject
 * @property {string} cuid Notification's unique identifier
 * @property {string} dateAdded Notification's registration date (yyyy-MM-dd'T'HH:mm:ss.SSS'Z')
 * @property {NotificationType} notificationType Notification's type
 * @property {string} destination Notification's destination. It is a user identifier
 * @property {(pending|redeemed)} state Notification's status
 * @property {Object} data Notification's data
 */
export default (cuid, notificationType, destination, dateAdded, state, data) => {
  const model = {
    cuid,
    notificationType,
    data,
    destination,
    dateAdded,
    state
  };
  return _.omitBy(model, _.isNil);
};

/** Notification types
 * @namespace Types
 * @memberof Notification
 */

/** DTO representing follow notification data
 * @namespace FollowNotification
 * @alias FollowNotification
 * @memberof Notification.Types
 * @property {string} image Origin's profile avatar
 * @property {string} origin Origin's profile id
 * @property {string} originName  Origin's profile name
 * @property {string} destination  Destination's profile id
 * @property {string} destinationName  Destination's profile name
 */
const FOLLOW_NOTIFICATION = (image, origin, originName, destination, destinationName) => ({
  image,
  origin,
  originName,
  destination,
  destinationName
});

const Builder = {
  FOLLOW: FOLLOW_NOTIFICATION
};

export { Builder };
