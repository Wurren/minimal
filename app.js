

/*
|--------------------------------------------------------------------------
| Dependencies
|--------------------------------------------------------------------------
*/

var express         = require('express'),
    path            = require('path'),
    favicon         = require('serve-favicon'),
    logger          = require('morgan'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    flash           = require('connect-flash'),
    passport        = require('./app/services/auth'),
    session         = require('express-session'),
    RedisStore      = require('connect-redis')(session);

var app = express();

/*
|--------------------------------------------------------------------------
| Jade
|--------------------------------------------------------------------------
*/

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.locals.pretty = true;


/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    store: new RedisStore(),
    secret: 'robotghostunicorn',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

var routes = require('./app/routes.js')(app);


/*
|--------------------------------------------------------------------------
| Catch 404 and forward to error handler
|--------------------------------------------------------------------------
*/

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/*
|--------------------------------------------------------------------------
| Error Handlers
|--------------------------------------------------------------------------
*/

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

module.exports = app;
