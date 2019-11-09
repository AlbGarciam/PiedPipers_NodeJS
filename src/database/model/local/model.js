import { model as Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { LocalSchema } from '../../schema';
import { Error } from '../../../dto';

const querySelect = 'cuid dateAdded name location price contact photos description -_id';

LocalSchema.index({ location: '2dsphere' });
LocalSchema.plugin(mongoosePaginate);

const LocalModel = Model('Local', LocalSchema);

LocalModel.getByCUID = async cuid => {
  try {
    return await LocalModel.findOne({ cuid }).select(querySelect);
  } catch (err) {
    throw Error.DTO(Error.CODE_SERVER_ERROR, Error.ECODE_DATABASE_ERROR, err.message);
  }
};

LocalModel.create = async item => {
  const model = LocalModel(item);
  try {
    return await model.save();
  } catch (err) {
    if (err.code === 11000) {
      throw Error.DTO(
        Error.CODE_AUTHORIZATION_ERROR,
        Error.ECODE_DUPLICATED_ITEM,
        Error.MSG_DUPLICATED_ITEM
      );
    }
    throw Error.DTO(Error.CODE_SERVER_ERROR, Error.ECODE_DATABASE_ERROR, err.errmsg);
  }
};

LocalModel.updateData = async (cuid, model) => {
  try {
    const query = { cuid };
    return await LocalModel.updateOne(query, model);
  } catch (err) {
    throw Error.DTO(Error.CODE_SERVER_ERROR, Error.ECODE_DATABASE_ERROR, err.message);
  }
};

LocalModel.search = async (filter, limit, skip) => {
  try {
    const options = {
      select: querySelect,
      limit,
      offset: skip,
      lean: false
    };
    return await LocalModel.paginate(filter, options);
  } catch (err) {
    throw Error.DTO(Error.CODE_SERVER_ERROR, Error.ECODE_DATABASE_ERROR, err.message);
  }
};

export default LocalModel;
