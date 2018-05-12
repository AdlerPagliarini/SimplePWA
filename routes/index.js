var express = require('express');
var router = express.Router();

router.get('', function(req, res, next){
    res.render('index.html');
});

/*router.get('/pwa', function(req, res, next){
    res.render('index.html');
});*/

// to be accessible for other files
module.exports = router;