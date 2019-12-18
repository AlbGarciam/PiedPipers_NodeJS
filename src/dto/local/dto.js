/** DTO representing a local on database
 * @namespace Local
 * @alias Local
 * @memberof module:DataTransferObject
 * @property {string} cuid Local's unique identifier
 * @property {string} dateAdded Local's registration date (yyyy-MM-dd'T'HH:mm:ss.SSS'Z')
 * @property {string} name Local's name
 * @property {Location} location Local's location
 * @property {number} price Local's price
 * @property {ContactMethod} contact Local's contact method
 * @property {string[]} photos Local's photos
 * @property {string} description Local's description
 * @property {string} shortDescription Local's description
 * @property {string} address Local's address
 */
export default (
  cuid,
  dateAdded,
  name,
  location,
  price,
  contact,
  photos,
  description,
  shortDescription,
  address
) => {
  return {
    cuid,
    dateAdded,
    name,
    location,
    price,
    contact,
    photos,
    description,
    shortDescription,
    address
  };
};
