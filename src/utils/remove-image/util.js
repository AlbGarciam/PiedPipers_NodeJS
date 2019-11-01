import { promises } from 'fs';
import path from 'path';

const filename = name => `${name}.png`;
const filepath = (destination, name) => path.resolve(`${destination}/${filename(name)}`);

export default async (destination, name) => {
  const filePath = filepath(destination, name);
  return promises.unlink(filePath);
};
