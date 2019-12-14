import path from 'path';
import sharp from 'sharp';
import { PATH } from '../../constants';

export default async (file, name) => {
  const { buffer } = file;
  const fileExtension = path.extname(file.originalname);
  const filename = `${name}${fileExtension}`;
  const filepath = `${PATH.IMAGES_PATH}/${filename}`;
  await sharp(buffer)
    .resize(300, 300, {
      fit: sharp.fit.inside,
      withoutEnlargement: true
    })
    .toFile(filepath);
  return PATH.relative(filepath);
};
