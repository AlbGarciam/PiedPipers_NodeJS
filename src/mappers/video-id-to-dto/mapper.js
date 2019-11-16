import _ from 'lodash';
import { Video } from '../../dto';

const idToThumbnail = id => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const idToEmbedVideo = id =>
  `https://www.youtube.com/embed/${id}?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;`;
const idToVideo = id => `https://www.youtube.com/watch?v=${id}`;

export default model => {
  if (_.isNil(model)) {
    return null;
  }
  return model.map(videoId =>
    Video.DTO(videoId, idToVideo(videoId), idToEmbedVideo(videoId), idToThumbnail(videoId))
  );
};
