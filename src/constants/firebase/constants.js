import * as admin from 'firebase-admin';
import * as firebaseAccountKey from '../../../etc/keys/firebaseAccountKey.json';

export default {
  credential: admin.credential.cert(firebaseAccountKey),
  databaseURL: process.env.FIREBASE_PATH
};
