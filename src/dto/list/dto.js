/** DTO representing instruments on database
 * @namespace List
 * @alias List
 * @memberof module:DataTransferObject
 * @property {number} total Total number of items
 * @property {number} offset Skipped elements
 * @property {string[]} items Instruments array
 */
export default (total, offset, items) => {
  return {
    total,
    offset,
    items
  };
};
