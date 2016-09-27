
var Config = require('../config');

var knex = require('knex')({
    client: 'mysql',
    connection: Config.db,
    debug: true
});

var Bookshelf = require('bookshelf')(knex);

// knex.on('query', function(data) {
//     app.log(data);
// });


Bookshelf.plugin('registry')

module.exports = Bookshelf;
