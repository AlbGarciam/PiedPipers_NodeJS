/**
 * Possible HTTP error codes that server can throw
 * @namespace
 * @memberof module:Constants
 */
const ErrorCodes = {
  /**
   * Internal server error
   * @constant
   * @type {number}
   * @default
   */
  CODE_SERVER_ERROR: 500,
  /**
   * Server logic error
   * @constant
   * @type {number}
   * @default
   */
  CODE_LOGIC_ERROR: 404,
  /**
   * Authorization error
   * @constant
   * @type {number}
   * @default
   */
  CODE_AUTHORIZATION_ERROR: 403,
  /**
   * Validation error
   * @constant
   * @type {number}
   * @default
   */
  CODE_VALIDATION_ERROR: 422
};

export default ErrorCodes;
