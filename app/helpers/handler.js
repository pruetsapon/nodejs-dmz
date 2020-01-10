const serviceLocator = require('./service_locator');
const logger = serviceLocator.get('logger');
const config = require('../configs/config');
const getRequestIp = require('../helpers/getRequestIp');

const errorHandler = (req, res, next) => {
    res.status(404);
    res.send('404 - "Not Found"');
    logger.log({message: 'response message', level: config.log.level, method: req.method, path: `${config.api.url}${req.path}`, ip: getRequestIp(req), statusCode: 404, statusMessage: '404 - "Not Found"'});
    return next(false);
}

const verifyHeader = (req, res, next) => {
    let checkHeader = 0;
    config.api.headers.forEach(h => {
        const header = req.headers[h];
        if(header === undefined || header === '') {
            checkHeader++;
        }
    });
    if(checkHeader == 0) {
        return next();
    } else {
        logger.log({message: 'response message', level: config.log.level, method: req.method, path: `${config.api.url}${req.path}`, ip: getRequestIp(req), statusCode: 401, statusMessage: '401 - "Unauthorization"'});
        return res.status(401).send('401 - "Unauthorization"');
    }
}

module.exports = { errorHandler, verifyHeader };