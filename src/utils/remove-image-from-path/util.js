import fs from 'fs-extra';
import path from 'path';
import { PATH } from '../../constants';

export default async file => {
  const filename = path.basename(file);
  const filepath = `${PATH.IMAGES_PATH}/${filename}`;
  const exists = await fs.pathExists(filepath);
  if (exists) {
    await fs.remove(filepath);
  }
};
