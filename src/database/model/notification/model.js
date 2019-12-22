import { model as Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { NotificationSchema } from '../../schema';
import { Error } from '../../../dto';

const querySelect = 'cuid dateAdded destination notificationType state data -_id';

NotificationSchema.plugin(mongoosePaginate);

const NotificationModel = Model('Notification', NotificationSchema);

NotificationModel.getByCUID = async cuid => {
  try {
    return await NotificationModel.findOne({ cuid }).select(querySelect);
  } catch (err) {
    throw Error.DATABASE(err.message);
  }
};

NotificationModel.search = async (query, limit, skip) => {
  try {
    const options = {
      select: querySelect,
      limit,
      offset: skip,
      lean: false
    };
    return await NotificationModel.paginate(query, options);
  } catch (err) {
    throw Error.DATABASE(err.message);
  }
};

NotificationModel.clean = async cuid => {
  try {
    await NotificationModel.deleteOne({ cuid });
  } catch (err) {
    throw Error.DATABASE(err.message);
  }
};

NotificationModel.create = async (cuid, destination, model) => {
  const item = NotificationModel({
    ...model,
    destination,
    cuid
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

NotificationModel.updateData = async (cuid, model) => {
  try {
    const local = await NotificationModel.updateOne({ cuid }, model);
    return local;
  } catch (err) {
    throw Error.DATABASE(err.message);
  }
};

export default NotificationModel;
