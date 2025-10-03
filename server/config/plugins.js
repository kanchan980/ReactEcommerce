
export default ({ env }) => ({
  // Users & Permissions plugin
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
});
