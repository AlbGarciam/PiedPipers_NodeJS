import _ from 'lodash';

export default comparation => {
  if (_.isNil(comparation)) {
    return null;
  }
  return new RegExp(`^${comparation.toLowerCase()}`, 'i');
};
