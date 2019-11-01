export default () => {
  const strPort = process.env.PORT || '3000';
  const port = parseInt(strPort, 10);
  if (Number.isNaN(port)) {
    return strPort;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
