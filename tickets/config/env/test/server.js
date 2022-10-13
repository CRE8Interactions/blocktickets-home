const cronTasks = require("./cron-tasks");

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('URL', 'https:/development.blocktickets.xyz'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  cron: {
    enabled: env("CRON_ENABLED", false),
    // tasks: cronTasks,
  },
});
