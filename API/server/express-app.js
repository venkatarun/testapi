/**
 * Created on 28/09/2017.
 */

const express = require('express'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    serviceRouter = require('./routes/serviceRoutes.routes'),
    runtimeRouter = require('./routes/runtimeRoutes.routes'),
    cors = require('cors'),
    app = express(),
    path = require('path');

app.use(express.static(path.join(__dirname, '../build')));
app.use(cors({
    credentials: true,
    origin: [true]
}));

// HELMET MIDDLEWARE CONFIGURATIONS
app.use(helmet.xssFilter({
    setOnOldIE: true
}));

app.use(helmet.frameguard({
    action: 'deny'
}));

app.use(helmet.hsts({
    maxAge: 7776000000,
    includeSubdomains: true
}));

app.use(helmet.referrerPolicy());
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.noCache());
app.use(helmet.dnsPrefetchControl());

// EXPRESS MIDDLEWARE
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); 
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/v1', serviceRouter);
app.use('/runtime', runtimeRouter);

/* ROUTES START HERE*/
module.exports = app;
