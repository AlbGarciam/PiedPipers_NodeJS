import fs from 'fs';
import _ from 'lodash';
import { createHash } from 'crypto';
import JWT from 'jsonwebtoken';
import moment from 'moment';
import { Error } from '../../dto';

const secretKey = fs.readFileSync('./etc/keys/private.key');
const publicKey = fs.readFileSync('./etc/keys/public.pem');

const sha256 = data =>
  createHash('sha256')
    .update(data, 'binary')
    .digest('base64');

const decryptJWT = async token => {
  if (_.isEmpty(token)) {
    throw Error.INVALID_TOKEN;
  }
  const data = await JWT.verify(token, publicKey, {
    algorithm: process.env.JWT_ALGORITHM
  });
  if (_.isNull(data)) {
    throw Error.INVALID_TOKEN;
  } else {
    return data;
  }
};

const encryptJWT = data =>
  JWT.sign(data, secretKey, {
    algorithm: process.env.JWT_ALGORITHM
  });

const controller = {};

controller.decodeToken = async jwt => {
  const data = await decryptJWT(jwt);
  const { email, id, addedDate, token } = data;
  const key = `${email}_${id}_${addedDate}`;
  if (_.isEqual(sha256(key), token)) {
    return data;
  }
  throw Error.INVALID_TOKEN;
};

controller.encodeToken = data => {
  const { email, id, addedDate } = data;
  const key = `${email}_${id}_${addedDate}`;
  const hashedKey = sha256(key);
  const jwtData = {
    ...data,
    userAction: moment().add(process.env.USER_ACTION_TTL, 'minutes'),
    token: hashedKey
  };
  return encryptJWT(jwtData);
};

export default controller;
