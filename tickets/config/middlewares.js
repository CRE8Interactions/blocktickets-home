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
      origin: ['http://localhost:1337', 'http://164.90.139.13:1337', 'http://localhost:3000', 'https://blocktickets.xyz', 'https://preview.blocktickets.xyz', 'https://admin.blocktickets.xyz']
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
