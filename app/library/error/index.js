'use strict';


const errors = require('./errors.json');

module.exports = (error, req, res, next) => {

    let status = error.status || 404,
        code = error.code || 10;

    if (error.message && error.message.indexOf('duplicate key error') >= 0) {
        status = 400;
        code = 13;
    }

    res.status(status).send({
        status: status,
        code: code,
        message: errors[status][code] || error.message
    });

    error = null;
    next = null;
};
