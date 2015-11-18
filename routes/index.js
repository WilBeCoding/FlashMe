var express = require('express');
var router = express.Router();
var authenticate = require('../utils/authenticate');
var jwt = require('jsonwebtoken');
var pg = require('pg');
var conString = process.env.DB_URI;
var bcrypt = require('bcrypt');
var expressJwt = require('express-jwt');

var app = express();

app.use(expressJwt({ secret: "secret" }).unless({ path: ['/login'] }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', authenticate, function(req, res, next){
  console.log("Body of the response:", req.body);
  // Passed authentication!
  var token = jwt.sign({
    username: req.body.email
  }, process.env.JWT_SECRET);
  res.send({
    token: token,
    user: req.body.email
  });
});

router.post('/register', function(req, res, next){
  var hash = bcrypt.hashSync(req.body.password, 8);
  pg.connect(process.env.DB_URI, function(err, client, done){
    client.query('SELECT * FROM users WHERE email=$1', [req.body.email], function(err, user){
      if(user.rows.length === 0){
        client.query('INSERT INTO users VALUES (default, $1, $2)', [req.body.email, hash], function(err, user){
          var token = jwt.sign({
            username: req.body.email
          }, process.env.JWT_SECRET);
          res.send({
            token: token,
            user: req.body.email
          });
        });
      } else {
        return res.status(409).end("User already exists!")
      }
    });
  });
});

router.get('/me', function(req, res, next){
  res.send(req.user);
})

module.exports = router;
