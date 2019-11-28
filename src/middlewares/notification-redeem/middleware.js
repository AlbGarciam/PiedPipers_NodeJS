import { NotificationController } from '../../controllers';

export default () => async (req, res, next) => {
  const { cuid } = req.params;
  try {
    const redeemedNotification = await NotificationController.redeem(cuid);
    res.locals = {
      ...res.locals,
      redeemedNotification
    };
    next();
  } catch (err) {
    next(err);
  }
};
