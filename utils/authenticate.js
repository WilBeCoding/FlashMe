var pg = require('pg');
var conString = process.env.DB_URI;

function authenticate(req, res, next){
  var body = req.body;
  console.log(body);
  // Check to see if they username and password were provided...
  if(!body.email || !body.password){
    return res.status(400).end("Must provide username or password");
  }

  pg.connect(process.env.DB_URI, function(err, client, done){
    if(err) {
      return console.error("Err while connecting to DB during authentication: ", err)
    }
    client.query('SELECT * FROM users WHERE email=$1', [body.email], function(err, user){
      console.log("User is:", user);
      if(body.email !== user.rows[0].email || body.password !== user.rows[0].password){
        // if it doesn't...
        return res.status(401).end("Username or password incorrect");
      }
      // if it does...
      next();
    })
  })

}

module.exports = authenticate;
