/** DTO representing a location on database
 * @namespace Location
 * @alias Location
 * @memberof module:DataTransferObject
 * @property {number} lat Latitude
 * @property {number} long Longitude
 */
export default (lat, long) => {
  return {
    lat,
    long
  };
};
