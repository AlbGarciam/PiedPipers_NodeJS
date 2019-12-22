import { model as Model } from 'mongoose';
import { NotificationToken } from '../../schema';
import { Error } from '../../../dto';

const querySelect = 'token user';

const TokenModel = Model('NotificationTokens', NotificationToken);

TokenModel.get = async user => {
  try {
    return await TokenModel.find({ user }).select(querySelect);
  } catch (err) {
    throw Error.DATABASE(err.message);
  }
};

TokenModel.register = async (user, token) => {
  const item = TokenModel({
    user,
    token
  });
  try {
    return await item.save();
  } catch (err) {
    if (err.code === 11000) {
      throw Error.DUPLICATED;
    }
    throw Error.DATABASE(err.message);
  }
};

TokenModel.unregister = async (user, token) => {
  try {
    await TokenModel.deleteOne({ user, token });
  } catch (err) {
    throw Error.DATABASE(err.message);
  }
};

export default TokenModel;
