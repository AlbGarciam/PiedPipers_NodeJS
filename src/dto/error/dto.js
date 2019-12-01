/** DTO representing an error on server
 * @namespace Error
 * @alias Error
 * @memberof module:DataTransferObject
 * @property {number} code HTTP error code
 * @property {number} ecode Extended error code
 * @property {string} message Error message
 */
const DTO = (code, ecode, message) => {
  return {
    code,
    ecode,
    message
  };
};

/** CODES */
/** @constant {number} */
const CODE_SERVER_ERROR = 500;
/** @constant {number} */
const CODE_LOGIC_ERROR = 404;
/** @constant {number} */
const CODE_AUTHORIZATION_ERROR = 403;
/** @constant {number} */
const CODE_VALIDATION_ERROR = 422;

/** ECODES */
const ECODE_DATABASE_ERROR = 1000;
const ECODE_ITEM_NOT_FOUND = 1001;
const ECODE_INVALID_PASSWORD = 1002;
const ECODE_INVALID_TOKEN = 1003;
const ECODE_UNKNOWN_ERROR = 1004;
const ECODE_DUPLICATED_ITEM = 1005;
const ECODE_LOGIN_REQUIRED = 1006;
const ECODE_VALIDATION_ERROR = 1007;
const ECODE_CORRUPTED_TOKEN = 1008;
const ECODE_USER_ALREADY_INVITED = 1009;
const ECODE_NOTIFICATION_ALREADY_REDEEMED = 1009;

/** MESSAGES */
const MSG_ITEM_NOT_FOUND = 'Item was not found';
const MSG_INVALID_PASSWORD = 'Invalid password';
const MSG_INVALID_TOKEN = 'Invalid token';
const MSG_UNKNOWN_ERROR = 'Unexpected error';
const MSG_LOGIN_REQUIRED = 'It is necessary to relogin the user before taking any action';
const MSG_DUPLICATED_ITEM = 'This item already exists';
const MSG_VALIDATION_ERROR = 'One or more parameters are invalid';
const MSG_INVALID_INSTRUMENTS_ERROR = 'Provided instruments are invalid';
const MSG_INVALID_LOCATION_ERROR = 'Provided location is invalid';
const MSG_INVALID_IMAGE_BUFFER = 'Please provide an image';
const MSG_CORRUPTED_TOKEN = 'Token was corrupted and cannot be parsed try to regenerate a new one';
const MSG_MISSING_USER_ID = 'Body does not contain userId';
const MSG_USER_ALREADY_INVITED = 'This user has been already invited';
const MSG_NOTIFICATION_ALREADY_REDEEMED = 'This notification has been already redeemed';

export {
  MSG_ITEM_NOT_FOUND,
  MSG_INVALID_PASSWORD,
  MSG_INVALID_TOKEN,
  MSG_UNKNOWN_ERROR,
  MSG_LOGIN_REQUIRED,
  MSG_VALIDATION_ERROR,
  MSG_DUPLICATED_ITEM,
  MSG_INVALID_INSTRUMENTS_ERROR,
  MSG_INVALID_LOCATION_ERROR,
  MSG_INVALID_IMAGE_BUFFER,
  MSG_CORRUPTED_TOKEN,
  MSG_MISSING_USER_ID
};

const Builder = {
  UNKNOWN: msg => DTO(CODE_SERVER_ERROR, ECODE_UNKNOWN_ERROR, msg),
  ITEM_NOT_FOUND: DTO(CODE_LOGIC_ERROR, ECODE_ITEM_NOT_FOUND, MSG_ITEM_NOT_FOUND),
  INVALID_PASSWORD: DTO(CODE_AUTHORIZATION_ERROR, ECODE_INVALID_PASSWORD, MSG_INVALID_PASSWORD),
  INVALID_TOKEN: DTO(CODE_AUTHORIZATION_ERROR, ECODE_INVALID_TOKEN, MSG_INVALID_TOKEN),
  VALIDATION: msg => DTO(CODE_VALIDATION_ERROR, ECODE_VALIDATION_ERROR, msg),
  CORRUPTED_TOKEN: DTO(CODE_VALIDATION_ERROR, ECODE_CORRUPTED_TOKEN, MSG_CORRUPTED_TOKEN),
  EXPIRED_TOKEN: DTO(CODE_AUTHORIZATION_ERROR, ECODE_LOGIN_REQUIRED, MSG_LOGIN_REQUIRED),
  DATABASE: msg => DTO(CODE_SERVER_ERROR, ECODE_DATABASE_ERROR, msg),
  DUPLICATED: DTO(CODE_AUTHORIZATION_ERROR, ECODE_DUPLICATED_ITEM, MSG_DUPLICATED_ITEM),
  INVITED_USER: DTO(CODE_LOGIC_ERROR, ECODE_USER_ALREADY_INVITED, MSG_USER_ALREADY_INVITED),
  NOTIFICATION_ALREADY_REDEEMED: DTO(
    CODE_LOGIC_ERROR,
    ECODE_NOTIFICATION_ALREADY_REDEEMED,
    MSG_NOTIFICATION_ALREADY_REDEEMED
  )
};

export { Builder };
