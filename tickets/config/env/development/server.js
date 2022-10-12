module.exports = ({ env }) => ({
  url: env('URL', 'localhost'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  proxy: env.bool('IS_PROXIED', true),
  cron: {
    enabled: env.bool('CRON_ENABLED', false),
  },
});
