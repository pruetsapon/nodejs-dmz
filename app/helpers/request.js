const rq = require('request-promise');
const config = require('../configs/config').api;

const newerror = (err) => {
    let error = new Error();
    if(err && err.statusCode) {
        error.message = err.message;
        error.statusCode = err.statusCode;
    } else {
        error.message = '500 - "Internal Server Error"';
        error.statusCode = 500;
    }
    return error;
};

class Request {
    constructor() {}

    async requested({url, body, headers, method, files}) {
        let option = {
            method: method,
            json:true,
            uri: `${config.url}${url}`,
            headers: headers
        };

        if(files && files.file)
        {
            let formData = body;
            const keys = Object.keys(files);
            keys.forEach(key => {
                let file = files[key];
                formData[key] = {
                    value: file.data,
                    options: {
                        filename: file.name,
                        contentType: file.mimetype
                    }
                };
            });
            option.formData = formData;
        } else {
            option.body = body;
        }
        let result;
        let error;
        await rq(option, (err, response, body) => {
            if (err) {
                error = newerror(err);
            } else if (!(/^2/.test('' + response.statusCode))) {
                error = newerror(response);
            } else {
                result = body;
            }
        });
        if(error) {
            throw error;
        } else {
            return result;
        }
    }
}

module.exports = Request;