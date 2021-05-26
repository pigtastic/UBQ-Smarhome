import device from './device';
import mutation from './mutation';
import query from './query';

export default {
  ...query,
  ...mutation,
  ...device,
};
