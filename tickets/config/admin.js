module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8bebb373d29cbc22694005dee193d810'),
  },
});
