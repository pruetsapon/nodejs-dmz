const config = require('../configs/config').api;

const verifyHeader = async (req, res, next) => {
    let checkHeader = 0;
    config.headers.forEach(h => {
        const header = req.headers[h];
        if(header === undefined || header === '') {
            checkHeader++;
        }
    });
    if(checkHeader == 0) {
        return next();
    } else {
        res.status(401);
        res.send('401 - "Unauthorized"');
        return next(false);
    }
}

module.exports = verifyHeader;