var express = require('express');
var router = express.Router();
var authenticate = require('../utils/authenticate');
var jwt = require('jsonwebtoken');
var pg = require('pg');
var conString = process.env.DB_URI;
var bcrypt = require('bcrypt');
var expressJwt = require('express-jwt');

router.use(expressJwt({ secret: "secret" }).unless({ path: ['/login', '/register'] }));

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

router.get('/newcard', function(req, res, next){
  console.log("Body request in GET to createcard:", req.body);
  // We need to read the HEADER property 'user'
  console.log(req.get('user'));
  var user = req.get('user');
  // res.send('Heres your data back');
  pg.connect(process.env.DB_URI, function(err, client, done){
    // done();
    console.log("USER for subject query: ", user)
    client.query('SELECT * FROM users WHERE email = $1', [user], function(err, result){
      // done();
      client.query('SELECT * FROM subjects WHERE user_id = $1', [result.rows[0].id], function(err, result){
        // done();
        console.log('subjects result: ', result)
        res.json(result.rows);
      })
    })
  })
})

router.post('/newcard', function(req, res, next) {
  // test if new subject or existing for different routes, currently only setup with new subject and hardcoded user
  if (req.body.subject){
    pg.connect(process.env.DB_URI, function(err, client, done){
      client.query('SELECT * FROM subjects WHERE name = $1', [req.body.subject], function(err, result){
        client.query('INSERT INTO cards VALUES (default, $2, $3, (SELECT id FROM subjects WHERE id = $1), 1)', [result.rows[0].id, req.body.question, req.body.answer], function(err, result){
          done();
          res.json(result);
        })
      })
    })

  } else {
    pg.connect(process.env.DB_URI, function(err, client, done) {
      client.query('SELECT * FROM users WHERE email=$1', [req.body.user], function(err, result){
        client.query('SELECT * FROM subjects WHERE name=$1 AND user_id=$2', [req.body.newSubject, result.rows[0].id], function(err, result){
           client.query('INSERT INTO subjects VALUES (default, (SELECT id FROM users WHERE email=$1), $2)', [ req.body.user, req.body.newSubject], function(err, result) {
             client.query('INSERT INTO cards VALUES (default, $2, $3, (SELECT id FROM subjects WHERE name=$1), 1)', [req.body.newSubject, req.body.question, req.body.answer], function(err, result){
              done();
              res.json(result);
             })

          });

        })
      })
    });
  }




});

router.get('/me', function(req, res, next){
  res.status(200).send("Cool!");
});

router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public'
  });
});

module.exports = router;
