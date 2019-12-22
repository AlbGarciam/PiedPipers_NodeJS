import { ERROR_CODES } from '../../constants';

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

/** ECODES */
/** @constant {number} */
const ECODE_DATABASE_ERROR = 1000;
/** @constant {number} */
const ECODE_ITEM_NOT_FOUND = 1001;
/** @constant {number} */
const ECODE_INVALID_PASSWORD = 1002;
/** @constant {number} */
const ECODE_INVALID_TOKEN = 1003;
/** @constant {number} */
const ECODE_UNKNOWN_ERROR = 1004;
/** @constant {number} */
const ECODE_DUPLICATED_ITEM = 1005;
/** @constant {number} */
const ECODE_LOGIN_REQUIRED = 1006;
/** @constant {number} */
const ECODE_VALIDATION_ERROR = 1007;
/** @constant {number} */
const ECODE_CORRUPTED_TOKEN = 1008;
/** @constant {number} */
const ECODE_USER_ALREADY_INVITED = 1009;
/** @constant {number} */
const ECODE_USER_ALREADY_FOLLOWING = 1010;
/** @constant {number} */
const ECODE_NOTIFICATION_ALREADY_REDEEMED = 1011;

/** MESSAGES */
/** @constant {string} */
const MSG_ITEM_NOT_FOUND = 'Item was not found';
/** @constant {string} */
const MSG_INVALID_PASSWORD = 'Invalid password';
/** @constant {string} */
const MSG_INVALID_TOKEN = 'Invalid token';
/** @constant {string} */
const MSG_UNKNOWN_ERROR = 'Unexpected error';
/** @constant {string} */
const MSG_LOGIN_REQUIRED = 'It is necessary to relogin the user before taking any action';
/** @constant {string} */
const MSG_DUPLICATED_ITEM = 'This item already exists';
/** @constant {string} */
const MSG_VALIDATION_ERROR = 'One or more parameters are invalid';
/** @constant {string} */
const MSG_INVALID_INSTRUMENTS_ERROR = 'Provided instruments are invalid';
/** @constant {string} */
const MSG_INVALID_LOCATION_ERROR = 'Provided location is invalid';
/** @constant {string} */
const MSG_INVALID_IMAGE_BUFFER = 'Please provide an image';
/** @constant {string} */
const MSG_CORRUPTED_TOKEN = 'Token was corrupted and cannot be parsed try to regenerate a new one';
/** @constant {string} */
const MSG_MISSING_USER_ID = 'Body does not contain userId';
/** @constant {string} */
const MSG_USER_ALREADY_INVITED = 'This user has been already invited';
/** @constant {string} */
const MSG_USER_ALREADY_FOLLOWING = 'This user has been already invited';
/** @constant {string} */
const MSG_NOTIFICATION_ALREADY_REDEEMED = 'This notification has been already redeemed';
/** @constant {string} */
const MSG_NOTIFICATION_INVALID_RECIPIENT = 'This recipient cannot be used';
/** @constant {string} */
const MSG_INVALID_FILE_FORMAT = 'Invalid file fomat';

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
  MSG_MISSING_USER_ID,
  MSG_NOTIFICATION_INVALID_RECIPIENT,
  MSG_INVALID_FILE_FORMAT
};

const Builder = {
  UNKNOWN: msg => DTO(ERROR_CODES.CODE_SERVER_ERROR, ECODE_UNKNOWN_ERROR, msg),
  ITEM_NOT_FOUND: DTO(ERROR_CODES.CODE_LOGIC_ERROR, ECODE_ITEM_NOT_FOUND, MSG_ITEM_NOT_FOUND),
  INVALID_PASSWORD: DTO(
    ERROR_CODES.CODE_AUTHORIZATION_ERROR,
    ECODE_INVALID_PASSWORD,
    MSG_INVALID_PASSWORD
  ),
  INVALID_TOKEN: DTO(ERROR_CODES.CODE_AUTHORIZATION_ERROR, ECODE_INVALID_TOKEN, MSG_INVALID_TOKEN),
  VALIDATION: msg => DTO(ERROR_CODES.CODE_VALIDATION_ERROR, ECODE_VALIDATION_ERROR, msg),
  CORRUPTED_TOKEN: DTO(
    ERROR_CODES.CODE_VALIDATION_ERROR,
    ECODE_CORRUPTED_TOKEN,
    MSG_CORRUPTED_TOKEN
  ),
  EXPIRED_TOKEN: DTO(
    ERROR_CODES.CODE_AUTHORIZATION_ERROR,
    ECODE_LOGIN_REQUIRED,
    MSG_LOGIN_REQUIRED
  ),
  DATABASE: msg => DTO(ERROR_CODES.CODE_SERVER_ERROR, ECODE_DATABASE_ERROR, msg),
  DUPLICATED: DTO(ERROR_CODES.CODE_AUTHORIZATION_ERROR, ECODE_DUPLICATED_ITEM, MSG_DUPLICATED_ITEM),
  INVITED_USER: DTO(
    ERROR_CODES.CODE_LOGIC_ERROR,
    ECODE_USER_ALREADY_INVITED,
    MSG_USER_ALREADY_INVITED
  ),
  ALREADY_FOLLOWING: DTO(
    ERROR_CODES.CODE_LOGIC_ERROR,
    ECODE_USER_ALREADY_FOLLOWING,
    MSG_USER_ALREADY_FOLLOWING
  ),
  NOTIFICATION_ALREADY_REDEEMED: DTO(
    ERROR_CODES.CODE_LOGIC_ERROR,
    ECODE_NOTIFICATION_ALREADY_REDEEMED,
    MSG_NOTIFICATION_ALREADY_REDEEMED
  )
};

export { Builder };
