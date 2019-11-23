import { INSTRUMENTS } from '../../constants';

export default instruments => {
  const filtered = instruments.filter(item => INSTRUMENTS.includes(item.toLowerCase()));
  return filtered.length === instruments.length;
};
