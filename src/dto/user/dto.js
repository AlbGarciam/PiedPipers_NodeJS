/** DTO representing a contact on database
 * @namespace User
 * @alias User
 * @memberof module:DataTransferObject
 * @property {string} email - User's email
 * @property {id} id - User's unique identifier (same as profile identifier)
 * @property {string} addDate - Indicates when user was added to database
 */
export default (email, id, addDate) => {
  return {
    email,
    id,
    addDate
  };
};
