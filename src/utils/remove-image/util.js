import fs from 'fs-extra';
import path from 'path';

const filename = name => `${name}.png`;
const filepath = (destination, name) => {
  return path.resolve(`${destination}/${filename(name)}`);
};

export default async (destination, name) => {
  const filePath = filepath(destination, name);
  const exists = await fs.pathExists(filePath);
  if (exists) {
    await fs.remove(filePath);
  }
};
