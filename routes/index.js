var express = require('express');
var router = express.Router();
var authenticate = require('../utils/authenticate');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', authenticate, function(req, res, next){
  // Passed authentication!
  var token = jwt.sign({
    username: username
  }, process.env.JWT_SECRET);
  res.send({
    token: token,
    user: user
  });
})

module.exports = router;
