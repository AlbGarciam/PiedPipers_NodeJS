/* eslint-disable no-unused-expressions */
import path from 'path';
import { Error } from '../../dto';
import { FILE_FORMATS } from '../../constants';

const INVALID_ERROR = Error.Builder.VALIDATION(Error.MSG_INVALID_FILE_FORMAT);

export default () => async (req, res, next) => {
  const { file } = req;
  const extension = path.extname(file.originalname).slice(1, 10) || '';
  const validFormat = FILE_FORMATS.includes(extension.toLowerCase());
  validFormat ? next() : next(INVALID_ERROR);
};
