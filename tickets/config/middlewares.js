module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'img-src': ["'self'", 'data:', 'blob:', "strapi.io", "cdn.jsdelivr.net", `https://${process.env.DO_SPACE_BUCKET}.${process.env.DO_SPACE_ENDPOINT}`],
          'media-src': ["'self'", 'data:', 'blob:', `https://${process.env.DO_SPACE_BUCKET}.${process.env.DO_SPACE_ENDPOINT}`],
          'script-src': ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net', "editor.unlayer.com"],
          "frame-src": ["'self'", "editor.unlayer.com", `https://${process.env.DO_SPACE_BUCKET}.${process.env.DO_SPACE_ENDPOINT}`],
        },
      }
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
