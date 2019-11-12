const DTO = (code, ecode, message) => {
  return {
    code,
    ecode,
    message
  };
};

export { DTO };

/** CODES */
const CODE_SERVER_ERROR = 500;
const CODE_LOGIC_ERROR = 404;
const CODE_AUTHORIZATION_ERROR = 403;
const CODE_VALIDATION_ERROR = 422;

export { CODE_SERVER_ERROR, CODE_LOGIC_ERROR, CODE_AUTHORIZATION_ERROR, CODE_VALIDATION_ERROR };

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

export {
  ECODE_DATABASE_ERROR,
  ECODE_ITEM_NOT_FOUND,
  ECODE_INVALID_PASSWORD,
  ECODE_INVALID_TOKEN,
  ECODE_UNKNOWN_ERROR,
  ECODE_LOGIN_REQUIRED,
  ECODE_VALIDATION_ERROR,
  ECODE_DUPLICATED_ITEM,
  ECODE_CORRUPTED_TOKEN
};

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
  MSG_CORRUPTED_TOKEN
};
