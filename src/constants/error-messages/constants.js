/**
 * Possible extended error codes that server can throw
 * @namespace
 * @memberof module:Constants
 */
const ErrorMessages = {
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_ITEM_NOT_FOUND: 'Item was not found',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_INVALID_PASSWORD: 'Invalid password',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_INVALID_TOKEN: 'Invalid token',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_UNKNOWN_ERROR: 'Unexpected error',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_LOGIN_REQUIRED: 'It is necessary to relogin the user before taking any action',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_DUPLICATED_ITEM: 'This item already exists',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_VALIDATION_ERROR: 'One or more parameters are invalid',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_INVALID_INSTRUMENTS_ERROR: 'Provided instruments are invalid',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_INVALID_LOCATION_ERROR: 'Provided location is invalid',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_INVALID_IMAGE_BUFFER: 'Please provide an image',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_CORRUPTED_TOKEN: 'Token was corrupted and cannot be parsed try to regenerate a new one',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_MISSING_USER_ID: 'Body does not contain userId',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_USER_ALREADY_INVITED: 'This user has been already invited',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_USER_ALREADY_FOLLOWING: 'This user has been already invited',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_NOTIFICATION_ALREADY_REDEEMED: 'This notification has been already redeemed',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_NOTIFICATION_INVALID_RECIPIENT: 'This recipient cannot be used',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_INVALID_FILE_FORMAT: 'Invalid file fomat',
  /**
   * @constant
   * @type {string}
   * @default
   */
  MSG_INVALID_ENDPOINT: 'This endpoint is not exposed by this server'
};

export default ErrorMessages;
