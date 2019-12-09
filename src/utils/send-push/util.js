import * as admin from 'firebase-admin';
import _ from 'lodash';
import { FIREBASE_CONFIG } from '../../constants';
import { NotificationToken } from '../../database/model';

export default async (destination, data) => {
  let dbTokens = [];
  try {
    dbTokens = await NotificationToken.get(destination);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  const tokens = dbTokens.map(item => item.token);
  if (_.isEmpty(tokens)) {
    return;
  }
  try {
    admin.initializeApp(FIREBASE_CONFIG);
    const message = { data, tokens };
    await admin.messaging().sendMulticast(message);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
