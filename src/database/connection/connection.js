import Mongoose from "mongoose";
import { MongoRoute } from "../../utils";

Mongoose.Promise = global.Promise;

const connection = async () => {
  const route = MongoRoute();
  console.info(`Connecting to mongo at: ${route}`);
  try {
    await Mongoose.connect(route, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
    console.info(`Successfully connected to mongo at: ${route}!`);
  } catch (error) {
    console.error(
      `Failed when connecting to: ${route}\n error: ${error.message}`
    );
    process.exit(1);
  }
};
export default connection;
