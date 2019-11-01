import Crypto from 'crypto';

const HashItem = (item, salt) => {
  const hash = Crypto.createHmac('sha512', salt);
  hash.update(item);
  return hash.digest('hex');
};

const ValidateEquality = (salt, item, hash) => HashItem(item, salt) === hash;

const GenerateSalt = () => Crypto.randomBytes(256).toString('hex');

export { ValidateEquality, HashItem, GenerateSalt };
