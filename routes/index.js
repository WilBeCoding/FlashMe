var express = require('express');
var router = express.Router();
var authenticate = require('../utils/authenticate');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', authenticate, function(req, res, next){
  // Passed authentication!
  res.send(user);
})

module.exports = router;
