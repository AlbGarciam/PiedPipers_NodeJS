import { Profile } from "../dto";

export default instruments => {
  const filtered = instruments.filter(item =>
    Profile.INSTRUMENTS.includes(item.toLowerCase())
  );
  return filtered.length === instruments.length;
};
