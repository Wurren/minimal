/*
|--------------------------------------------------------------------------
| Config 
|--------------------------------------------------------------------------
*/

var env = process.env.NODE_ENV || 'development',
    config;


if ( env ==='development' ) {
    console.log('running in Development Mode...')
    config = require('./development.js');
} else {
    console.log('running in Production Mode...')
    config = require('./production.js');
}

exports = module.exports = config;
