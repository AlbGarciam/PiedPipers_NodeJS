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
    throw Error.Builder.DATABASE(err.message);
  }
};

LocalModel.create = async item => {
  const model = LocalModel(item);
  try {
    return await model.save();
  } catch (err) {
    if (err.code === 11000) {
      throw Error.Builder.DUPLICATED;
    }
    throw Error.Builder.DATABASE(err.message);
  }
};

LocalModel.updateData = async (cuid, model) => {
  try {
    const local = await LocalModel.updateOne({ cuid }, model);
    return local;
  } catch (err) {
    throw Error.Builder.DATABASE(err.message);
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
    throw Error.Builder.DATABASE(err.message);
  }
};

LocalModel.clean = async cuid => {
  try {
    await LocalModel.deleteOne({ cuid });
  } catch (err) {
    throw Error.Builder.DATABASE(err.message);
  }
};

LocalModel.insertImage = async (cuid, image) => {
  try {
    const local = await LocalModel.getByCUID(cuid);
    const { photos = [] } = local;
    photos.push(image);
    await LocalModel.updateData(cuid, { photos });
  } catch (err) {
    throw Error.Builder.DATABASE(err.message);
  }
};

LocalModel.removeImage = async (cuid, image) => {
  try {
    console.log(image);
    const local = await LocalModel.getByCUID(cuid);
    console.log(local);
    const { photos = [] } = local;
    await LocalModel.updateData(cuid, { photos: photos.filter(item => item !== image) });
  } catch (err) {
    throw Error.Builder.DATABASE(err.message);
  }
};

export default LocalModel;
