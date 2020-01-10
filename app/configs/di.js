const serviceLocator = require('../helpers/service_locator');
const config = require('../configs/config');
const fs = require('fs');

serviceLocator.register('routes', (serviceLocator) => {
  const routes = JSON.parse(fs.readFileSync('./app/routes/route.json', 'utf8'));
  return routes;
});

serviceLocator.register('request', (serviceLocator) => {
  const Request = require('../helpers/request');
  return new Request();
});

serviceLocator.register('logger', () => {
  return require('../helpers/logger').create(config.log);
});

serviceLocator.register('requestController', (serviceLocator) => {
  const request = serviceLocator.get('request');
  const logger = serviceLocator.get('logger');
  const RequestController = require('../controllers/requestController');
  return new RequestController(request, logger);
});

module.exports = serviceLocator;