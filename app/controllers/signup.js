
var express = require('express'),
    router  = express.Router(),
    models = require('../models');

/*
|--------------------------------------------------------------------------
| Signup Controller
|--------------------------------------------------------------------------
*/

router.get('/', (req, res, next) => {
    res.render('register', { fields: false });
});

router.post('/', (req, res, next) => {

    var user = new models.User(req.body);

    user.save().then((model) => {
        req.flash('message', 'YAY!')
        res.redirect('/login');
    }).catch((err) => {
        console.log(err);
        res.render('register', { errors: err, fields: req.body });
    });

});

/*
|--------------------------------------------------------------------------
| Export 
|--------------------------------------------------------------------------
*/

module.exports = router;
