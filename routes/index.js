var express = require('express');
var router = express.Router();
var authenticate = require('../utils/authenticate');
var jwt = require('jsonwebtoken');
var pg = require('pg');
var conString = process.env.DB_URI;
var dotenv = require('dotenv');
var bcrypt = require('bcrypt');
var dotenv = require('dotenv');
var expressJwt = require('express-jwt');

dotenv.load();
router.use(expressJwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/login', '/register', '/favicon.ico'] }));

router.post('/login', authenticate, function(req, res, next){
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
          done();
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

  var user = req.get('user');


  pg.connect(process.env.DB_URI, function(err, client, done){


    client.query('SELECT * FROM users WHERE email = $1', [user], function(err, result){

      client.query('SELECT * FROM subjects WHERE user_id = $1', [result.rows[0].id], function(err, result){

        if(!result.rows.length){
          res.json({noSubjects:true});
        } else {
          var queryString = "SELECT * FROM cards WHERE subject_id IN (";
          for (var i = 0; i < result.rows.length; i++){
            if (i === result.rows.length - 1){
              queryString += result.rows[i].id + ")";
            } else {
              queryString += result.rows[i].id + ", ";
            }
          }
          var outputObject = {subjects: result.rows};
          client.query(queryString, function(err, result){
            if (err) {
              res.json('No Cards Found');
            }
            outputObject.cards = result.rows;
            done();
            res.json(outputObject);
          });
        }

      });
    });
  });
});

router.post('/newcard', function(req, res, next) {
  // test if new subject or existing for different routes, currently only setup with new subject and hardcoded user
  if (req.body.subject){
    pg.connect(process.env.DB_URI, function(err, client, done){
      client.query('SELECT * FROM users WHERE email=$1', [req.body.user], function(err, result){
        client.query('SELECT * FROM subjects WHERE name = $1 AND user_id=$2', [req.body.subject, result.rows[0].id], function(err, result){
          client.query('INSERT INTO cards VALUES (default, $2, $3, (SELECT id FROM subjects WHERE id = $1), 1)', [result.rows[0].id, req.body.question, req.body.answer], function(err, result){
            done();
            res.json(result);
          })
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

router.post('/subjects', function(req, res, next){
  var filtered = [req.body.id];
  pg.connect(process.env.DB_URI, function(err, client, done){
    client.query('SELECT * FROM cards WHERE subject_id = $1', [req.body.id], function(err, result){
      var cardsArray = result.rows.filter(function(each){
        return each.rating < 3;
      })
      var m = cardsArray.length, i, t;
      while (m){
        i = Math.floor(Math.random() * m--);
        t = cardsArray[m];
        cardsArray[m] = cardsArray[i];
        cardsArray[i] = t;
      }

      var outputObject = {cards: cardsArray};
      done();
      res.json(outputObject);
    })
  })
});

router.post('/study', function(req, res){
  pg.connect(process.env.DB_URI, function(err, client, done){

    client.query("UPDATE cards SET rating = $2 WHERE id = $1", [req.body.id, req.body.rating], function(err, result){
      done();
      res.json(result); // no need for json since we don't need return data... right?
    })
  })
});

router.post('/cards', function(req, res){

  pg.connect(process.env.DB_URI, function(err, client, done){
    client.query("SELECT * FROM cards WHERE subject_id=$1", [req.body.subject], function(err, result){
      done();
      res.json(result);
    });
  });
});

router.post('/reset', function(req, res){

  pg.connect(process.env.DB_URI, function(err, client, done){
    client.query("UPDATE cards SET rating = 1 WHERE subject_id = $1", [req.body.subject], function(err, result){

      done();
      res.json(result);
    })
  })
})

router.get('/me', function(req, res, next){
  res.status(200).send("Cool!");
});

router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public'
  });
});

module.exports = router;
