'use strict';


let express = require('express'),
    app = express(),
    port = process.env.PORT;

app.use(
    (req, res, next) => {
        res.setHeader('X-POWERED-BY', 'analogbird.com');
        return next();
    },
    require('body-parser').json(),
    require('body-parser').urlencoded({ extended: false }),
    require('compression')(),
    require('serve-favicon')(__dirname + '/public/img/favicon.png'),
    require('./router')(express),
    require('./library/error')
);

app.listen(port, () => {
    console.log(`The app is up on port: ${port}`);
});
