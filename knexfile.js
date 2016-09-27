// Update with your config settings.

var Config = require('./app/config');

module.exports = {

    development: {
        client: 'mysql',
        connection: Config.db
    },

    production: {
        client: 'mysql',
        connection: Config.db
    }

};
