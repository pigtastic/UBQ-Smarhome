import * as dotenv from 'dotenv';

dotenv.config();
let path;
console.log(`NODE_ENV= ${process.env.NODE_ENV}`);
switch (process.env.NODE_ENV) {
  case 'prod':
    path = `${__dirname}/../../environments/production.env`;
    break;
  case 'dev':
    path = `${__dirname}/../../environments/development.env`;
    break;
  default:
    console.log('No environment set...');
}
dotenv.config({ path });

export default {
  MONGO_URI: process.env.MONGO_URI,
};
