/** DTO representing a video on database
 * @namespace Video
 * @alias Video
 * @memberof module:DataTransferObject
 * @property {string} id Video's unique identifier
 * @property {string} video Video's original link
 * @property {string} embedVideo Video's embed link
 * @property {string} thumbnail Video's thumbnail
 */
export default (id, video, embedVideo, thumbnail) => {
  return { id, video, embedVideo, thumbnail };
};
