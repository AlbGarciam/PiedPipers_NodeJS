import { model as Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { NotificationSchema } from '../../schema';
import { Error } from '../../../dto';

const querySelect = 'cuid dateAdded destination notificationType data -_id';

NotificationSchema.plugin(mongoosePaginate);

const NotificationModel = Model('Notification', NotificationSchema);

NotificationModel.getByCUID = async cuid => {
  try {
    return await NotificationModel.findOne({ cuid }).select(querySelect);
  } catch (err) {
    throw Error.Builder.DATABASE(err.message);
  }
};

NotificationModel.getByDestination = async (destination, limit, skip) => {
  try {
    const options = {
      select: querySelect,
      limit,
      offset: skip,
      lean: false
    };
    return await NotificationModel.paginate({ destination }, options);
  } catch (err) {
    throw Error.Builder.DATABASE(err.message);
  }
};

NotificationModel.clean = async cuid => {
  try {
    await NotificationModel.deleteOne({ cuid });
  } catch (err) {
    throw Error.Builder.DATABASE(err.message);
  }
};

NotificationModel.follow = async (origin, destination) => {
  const item = {
    destination,
    notificationType: 'follow',
    data: {
      origin,
      destination
    }
  };
  const model = NotificationModel(item);
  try {
    return await model.save();
  } catch (err) {
    if (err.code === 11000) {
      throw Error.Builder.DUPLICATED;
    }
    throw Error.Builder.DATABASE(err.message);
  }
};

export default NotificationModel;
