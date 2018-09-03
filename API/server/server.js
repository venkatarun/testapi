'use strict';

//all requires on the top of the file
const mongoose = require('mongoose');
const app = require('./express-app');
const server = require('http').createServer(app);
const _config = require("../config/config");
const util = require('util');
const logger = require('commonmodules').logger;

//main function which initialises the service
function init() {
    const debug = require('debug')('express-mongoose-es6-rest-api:index');

    // connect to mongo db
    let url = 'mongodb://' + _config.mongodb.server_name + '/' + _config.mongodb.database;

    mongoose.connect(url);

    mongoose.connection.on('error', () => {
        throw new Error(`unable to connect to database: ${url}`);
    });

    // print mongoose logs in dev env
    if (true) {
        mongoose.set('debug', (collectionName, method, query, doc) => {
            debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
        });
    }

    let port = process.env.PORT || 3005;
    server.listen(port, (serverErr) => {
        if (serverErr) {
            logger.error(serverErr);
        } else {
            logger.info('Server has started on PORT: %s', port);
        }
    });
}

module.exports = {
    init
};
