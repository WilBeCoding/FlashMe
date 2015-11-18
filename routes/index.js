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
      console.log("USER: ", user)
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


router.post('/createcard', function(req, res, next) {
  // test if new subject or existing for different routes, currently only setup with new subject and hardcoded user
  pg.connect(process.env.DB_URI, function(err, client, done) {
    console.log("Body: ", req.body);
    client.query('SELECT * FROM subjects WHERE name=$1', [req.body.newSubject], function(err, result){
      if (err) {alert('Subject already exists')}
       client.query('INSERT INTO subjects VALUES (default, (SELECT id FROM users WHERE email=$1), $2)', [ req.body.user, req.body.newSubject], function(err, result) {
         client.query('INSERT INTO cards VALUES (default, $2, $3, (SELECT id FROM subjects WHERE name=$1), 1)', [req.body.newSubject, req.body.question, req.body.answer], function(err, result){
          console.log('error: ', err)
          console.log('result', result);
          done();
          res.json(result);
         })

      });

    })

  });
});

router.get('/me', function(req, res, next){
  res.send(req.user);
});

module.exports = router;
