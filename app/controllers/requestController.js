const config = require('../configs/config');
const getRequestIp = require('../helpers/getRequestIp');

class RequestController {
    constructor(request, logger) {
        this.request = request;
        this.logger = logger;
    }

    async requested(req, res) {
        try {
            const result = await this.request.requested(req);
            res.send(result);
            this.logger.log({message: 'response message', level: config.log.level, method: req.method, path: `${config.api.url}${req.path}`, requestIp: getRequestIp(req), statusCode: 200});
        } catch (err) {
            res.status(err.statusCode);
            res.send(err.message);
            this.logger.log({message: 'response message', level: config.log.level, method: req.method, path: `${config.api.url}${req.path}`, requestIp: getRequestIp(req), statusCode: err.statusCode, statusMessage: err.message});
        }
    }
}

module.exports = RequestController;