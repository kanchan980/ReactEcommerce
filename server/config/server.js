// config/server.js
const path = require('path');
const dotenv = require('dotenv'); // Import dotenv
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Load .env file

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', [
      'mySuperSecretKey1',
      'mySuperSecretKey2',
      'mySuperSecretKey3',
      'mySuperSecretKey4',
    ]),
  },
});