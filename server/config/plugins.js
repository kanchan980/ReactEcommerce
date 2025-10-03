// path: ./config/plugins.js
module.exports = ({ env }) => ({
  // Users & Permissions plugin
  "users-permissions": {
    config: {
      jwtSecret: env('JWT_SECRET'), 
    },
  },
});
