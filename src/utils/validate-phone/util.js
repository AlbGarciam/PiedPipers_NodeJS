export default string => {
  const pattern = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$';
  const regex = RegExp(pattern, 'i');
  return regex.test(string);
};
