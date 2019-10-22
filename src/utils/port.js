const getPort = () => {
  const serverPort = process.env.PORT || "3000";
  var port = parseInt(serverPort, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

export default getPort;
