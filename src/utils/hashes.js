import Crypto from "crypto";

const ValidateEquality = (salt, item, hash) => {
  return hashItem(item, salt) === hash;
};

const HashItem = (item, salt) => {
  const hash = Crypto.createHmac("sha512", salt);
  hash.update(item);
  return hash.digest("hex");
};

const GenerateSalt = () => Crypto.randomBytes(256).toString("hex");

export { ValidateEquality, HashItem, GenerateSalt };
