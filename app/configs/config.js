module.exports = {
    app: {
      name: process.env.APP_NAME,
      port: process.env.APP_PORT || 8000,
      environment: process.env.APPLICATION_ENV
    },
    api: {
      url: process.env.API_URL,
      headers: process.env.API_HEADERS != '' ? process.env.API_HEADERS.split(',') : []
    },
    log: {
      path: process.env.LOG_PATH || './logs/logs_%DATE%.log',
      level: process.env.LOG_LEVEL || 'info',
      console: process.env.LOG_ENABLE_CONSOLE || true
    }
};