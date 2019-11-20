export default filepath => {
  const regexPath = /^(.*[\\\/])(.*)$/;
  const match = regexPath.exec(filepath);
  if (match !== null) {
    return match[2].split('.')[0];
  }
  return null;
};
