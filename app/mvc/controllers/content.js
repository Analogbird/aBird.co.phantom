'use strict';


let phantom = require('phantom'),
    uuid = require('node-uuid'),
    closeNode = node => {
        node.page.close();
        node.instance.exit();
    };

module.exports = {

    capture: (req, res, next) => {

        let phantomNode = {
                instance: null,
                page: ''
            },
            width = req.body.width || 1024,
            height = req.body.height || 640;

        if (!req.body.url) {
            return next({ status: 400, code: 10 });
        }

        phantom.create()
            .then(instance => {
                phantomNode.instance = instance;
                return instance.createPage();
            })
            .then(page => {
                phantomNode.page = page;
                page.property('viewportSize', { width: width, height: height });
                page.property('clipRect', {
                    top: 0,
                    left: 0,
                    width: width,
                    height: height
                });

                return page.open(req.body.url);
            })
            .then(() => phantomNode.page.render(`${uuid.v4()}.png`))
            .then(() => {
                closeNode(phantomNode);
                res.send({
                    url: 'URL_OF_THE_SCREEN_SHOT'
                });
            })
            .catch(error => {
                closeNode(phantomNode);
                next(error);
            });
    }
};
