'use strict';


module.exports = (router, control) => {

    router.get('/', control.index);

    return router;
};
