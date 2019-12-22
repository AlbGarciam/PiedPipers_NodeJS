/**
 * Possible extended error codes that server can throw
 * @namespace
 * @memberof module:Constants
 */
const ExtendedErrorCodes = {
  /**
   * Database error
   * @constant
   * @type {number}
   * @default
   */
  ECODE_DATABASE_ERROR: 1000,
  /**
   * Item not found
   * @constant
   * @type {number}
   * @default
   */
  ECODE_ITEM_NOT_FOUND: 1001,
  /**
   * Invalid password error
   * @constant
   * @type {number}
   * @default
   */
  ECODE_INVALID_PASSWORD: 1002,
  /**
   * Invalid token error
   * @constant
   * @type {number}
   * @default
   */
  ECODE_INVALID_TOKEN: 1003,
  /**
   * Unknown error
   * @constant
   * @type {number}
   * @default
   */
  ECODE_UNKNOWN_ERROR: 1004,
  /**
   * Duplicated item error
   * @constant
   * @type {number}
   * @default
   */
  ECODE_DUPLICATED_ITEM: 1005,
  /**
   * Login required error
   * @constant
   * @type {number}
   * @default
   */
  ECODE_LOGIN_REQUIRED: 1006,
  /**
   * Validation error
   * @constant
   * @type {number}
   * @default
   */
  ECODE_VALIDATION_ERROR: 1007,
  /**
   * Invalid token error
   * @constant
   * @type {number}
   * @default
   */
  ECODE_CORRUPTED_TOKEN: 1008,
  /**
   * User already invited error
   * @constant
   * @type {number}
   * @default
   */
  ECODE_USER_ALREADY_INVITED: 1009,
  /**
   * User already followed error
   * @constant
   * @type {number}
   * @default
   */
  ECODE_USER_ALREADY_FOLLOWING: 1010,
  /**
   * Notification already redeemed error
   * @constant
   * @type {number}
   * @default
   */
  ECODE_NOTIFICATION_ALREADY_REDEEMED: 1011
};

export default ExtendedErrorCodes;
