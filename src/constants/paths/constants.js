import path from 'path';

const IMAGES_PATH = path.resolve('./public/img');
const relative = filename => path.relative('./public', filename);

export { IMAGES_PATH, relative };
