const cronTasks = require("../../cron-tasks");

module.exports = ({ env }) => ({
  host: env('HOST'),
  port: env.int('PORT'),
  url: env('URL'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  cron: {
    enabled: env("CRON_ENABLED", false),
    tasks: cronTasks,
  },
});
