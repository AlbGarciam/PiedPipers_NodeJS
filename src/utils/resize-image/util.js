import sharp from 'sharp';
import path from 'path';

const filename = name => `${name}.png`;
const filepath = (destination, name) => path.resolve(`${destination}/${filename(name)}`);

export default async (destination, name, buffer) => {
  const filePath = filepath(destination, name);
  await sharp(buffer)
    .resize(300, 300, {
      fit: sharp.fit.inside,
      withoutEnlargement: true
    })
    .toFile(filepath);
  return filePath;
};
