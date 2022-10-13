const cronTasks = require("../../cron-tasks");

module.exports = ({ env }) => ({
  host: env('HOST'),
  port: env.int('PORT'),
  url: env('URL'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  proxy: env.bool('IS_PROXIED', true),
  cron: {
    enabled: env.bool('CRON_ENABLED', false),
  },
});