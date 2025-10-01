// module.exports = ({ env }) => ({
//   auth: {
//     secret: env('ADMIN_JWT_SECRET', '2W9jY1L3arfTHHHw7Jz6aQ=='),
//   },
//   apiToken: {
//     salt: env('API_TOKEN_SALT', 'w1q2+3r4s5t6u7v8w9x0y1z2=='),
//   },
// });
module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2W9jY1L3arfTHHHw7Jz6aQ=='),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'w1q2+3r4s5t6u7v8w9x0y1z2=='),
  },
});
