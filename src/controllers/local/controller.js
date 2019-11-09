import Cuid from 'cuid';
import LocalModel from '../../database/model';

const controller = {};

controller.create = async (dateAdded, name, location, price, contact, photo, description) => {
  // It is not necessary to check each field because db will throw an error
  const cuid = Cuid();
  const model = { cuid, dateAdded, name, location, price, contact, photo, description };
  await LocalModel.create(model);
};

export default controller;
