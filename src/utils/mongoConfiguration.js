const config = {
  path: process.env.MONGO_PATH,
  port: process.env.MONGO_PORT,
  database: process.env.MONGO_DATABASE,
  schema: "mongodb://"
};

const route = () => {
  return `${config.schema}${config.path}:${config.port}/${config.database}`;
};

export default config;
export { route };
