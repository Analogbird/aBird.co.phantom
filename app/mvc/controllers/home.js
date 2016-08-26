'use strict';


module.exports = {

    index: (req, res) => {

        res.send({
            status: 200,
            message: 'Our service is up and running but there is nothing here.'
        });
    }
};
