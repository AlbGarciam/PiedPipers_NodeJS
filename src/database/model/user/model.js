import { model } from 'mongoose';
import { Error } from '../../../dto';
import { UserSchema } from '../../schema';

const UserModel = model('User', UserSchema);

UserModel.getByEmail = async email => {
  try {
    return await UserModel.findOne({ email }).select('email password cuid dateAdded salt -_id');
  } catch (err) {
    throw Error.DATABASE(err.message);
  }
};

UserModel.getByCuid = async cuid => {
  try {
    return await UserModel.findOne({ cuid }).select('email password cuid dateAdded salt -_id');
  } catch (err) {
    throw Error.DATABASE(err.message);
  }
};

UserModel.createUser = async user => {
  try {
    return await user.save();
  } catch (err) {
    if (err.code === 11000) {
      throw Error.DUPLICATED;
    }
    throw Error.DATABASE(err.message);
  }
};

UserModel.updatePassword = async (cuid, password) => {
  try {
    return await UserModel.updateOne({ cuid }, { password });
  } catch (err) {
    throw Error.DATABASE(err.message);
  }
};

UserModel.clean = async cuid => {
  try {
    await UserModel.deleteOne({ cuid });
  } catch (err) {
    throw Error.DATABASE(err.message);
  }
};

export default UserModel;
