// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");
var db = require("../models");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------
  const redirectLogin = (req,res,next) =>{
    if(!req.session.userId){
      console.log("no user found 1")
      res.redirect('/login')
    }else{
      next()
    }
  }
  
  const redirectHome = (req,res,next) =>{
    if(req.session.userId){
      console.log("userId exists redirect to home")
      res.redirect('/home')
    }else{
      next()
    }
  }
  
  

  app.get("/", function(req, res) {
    const {userId} = req.session
    if(userId){
      res.sendFile(path.join(__dirname, "../public/home.html"));
    }else{
      res.send(
     `<a href='/login'>Login</a>
      <a href='/register'>Register</a>`)
    }
  });

  app.get("/login",redirectHome,function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  
  //account routes will deliver the creat login page
  app.get("/register",redirectHome,function(req, res) {
    res.sendFile(path.join(__dirname, "../public/register.html"));
  });

  // Load index page
  app.get("/home",redirectLogin,function(req, res) {
    db.Users.findAll({}).then(function(data) {
      res.render("index");
    });
  });
};


