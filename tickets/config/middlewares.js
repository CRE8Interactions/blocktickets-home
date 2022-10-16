module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'img-src': ["'self'", 'data:', 'blob:', "strapi.io", "cdn.jsdelivr.net", `https://${process.env.DO_SPACE_BUCKET}.${process.env.DO_SPACE_ENDPOINT}`],
          'media-src': ["'self'", 'data:', 'blob:', `https://${process.env.DO_SPACE_BUCKET}.${process.env.DO_SPACE_ENDPOINT}`],
          'script-src': ["'self'", "editor.unlayer.com"],
          "frame-src": ["'self'", "editor.unlayer.com"],
        },
      }
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [process.env.PROD_CMS_HOST, process.env.ADMIN_APP_HOST, process.env.CONSUMER_APP_HOST]
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
