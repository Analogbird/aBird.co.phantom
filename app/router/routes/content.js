'use strict';


module.exports = (router, control) => {

    router.post('/capture', control.capture);

    return router;
};
