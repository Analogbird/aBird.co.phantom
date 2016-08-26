'use strict';


let co = require('co'),
    phantom = require('phantom'),
    uuid = require('node-uuid');

module.exports = {

    capture: (req, res, next) => {

        const width = req.body.width || 1024,
              height = req.body.height || 640,
              output = `${uuid.v4()}.png`;

        let instance = null,
            page = null;

        if (!req.body.url) {
            return next({ status: 400, code: 10 });
        }

        co(function* () {
            instance = yield phantom.create();
            page = yield instance.createPage();

            page.property('viewportSize', { width: width, height: height });
            page.property('clipRect', {
                top: 0,
                left: 0,
                width: width,
                height: height
            });

            yield page.open(req.body.url);
            yield page.render(output);
        }).then(() => {
            page.close();
            instance.exit();

            res.send({
                url: `http://cometa.service.url/${output}`
            });
        }).catch(error => next(error));
    }
};
