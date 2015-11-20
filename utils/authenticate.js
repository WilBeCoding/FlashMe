var pg = require('pg');
var conString = process.env.DB_URI;
var bcrypt = require('bcrypt');

function authenticate(req, res, next){
  var body = req.body;

  // Check to see if they username and password were provided...
  if(!body.email || !body.password){
    return res.status(400).end("Must provide username or password");
  }

  pg.connect(process.env.DB_URI, function(err, client, done){
    if(err) {
      return console.error("Err while connecting to DB during authentication: ", err)
    }
    client.query('SELECT * FROM users WHERE email=$1', [body.email], function(err, user){
      if(!bcrypt.compareSync(req.body.password, user.rows[0].password)){
        // if it doesn't...
        return res.status(401).end("Username or password incorrect");
      }
      // if it does...
      done();
      next();
    })
  })

}

module.exports = authenticate;
