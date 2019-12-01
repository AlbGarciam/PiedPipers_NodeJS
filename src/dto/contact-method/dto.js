/** DTO representing a contact on database
 * @namespace ContactMethod
 * @alias ContactMethod
 * @memberof module:DataTransferObject
 * @property {(phone|email)} type Contact method type
 * @property {string} data Contact method data
 */
export default (type, data) => {
  return {
    type,
    data
  };
};
