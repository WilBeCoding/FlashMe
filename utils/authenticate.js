function authenticate(req, res, next){
  var body = req.body;
  // Check to see if they username and password were provided...
  if(!body.username || !body.password){
    res.status(400).end("Must provide username or password");
  }

  
  if(body.username !== user.username || body.password !== user.password){
    // if it doesn't...
    res.status(401).end("Username or password incorrect");
  }
  // if it does...
  next();
}

module.exports = authenticate;
