# Error

This DTO represents an error on the server. It has the following values

- **code**: _Int_ (_Mandatory_) HTTP error code
- **ecode**: _Int_ (_Mandatory_) Extended code
- **message**: _String_ (_Mandatory_) Error message

## Example

```javascript
{
    "code": Int,
    "ecode": Int,
    "message": String
}
```

## Constants

```javascript
/** CODES */
const CODE_SERVER_ERROR = 500;
const CODE_LOGIC_ERROR = 404;
const CODE_AUTHORIZATION_ERROR = 403;
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

/** MESSAGES */
const MSG_ITEM_NOT_FOUND = 'Item was not found';
const MSG_INVALID_PASSWORD = 'Invalid password';
const MSG_INVALID_TOKEN = 'Invalid token';
const MSG_UNKNOWN_ERROR = 'Unexpected error';
const MSG_LOGIN_REQUIRED = 'It is necessary to relogin the user before taking any action';
const MSG_DUPLICATED_ITEM = 'This item already exists';
const MSG_VALIDATION_ERROR = 'One or more parameters are invalid';
const MSG_INVALID_INSTRUMENTS_ERROR = 'Provided instruments are invalid';
const MSG_INVALID_LOCATION_ERROR = 'Provided instruments are invalid';
```
