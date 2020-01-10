require('dotenv').config();
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const config = require('./app/configs/config');
const serviceLocator = require('./app/configs/di');
const logger = serviceLocator.get('logger');
const routes = require('./app/routes/route');
const handler = require('./app/helpers/handler');

server.use(cors());
server.use(fileUpload());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(handler.verifyHeader);

// api routes
routes.register(server, serviceLocator);

server.use(handler.errorHandler);

// start server
server.listen(config.app.port, () => {
  logger.log({message: `${config.app.name} server is running on port - ${config.app.port}`, level: config.log.level});
});

module.exports = server;