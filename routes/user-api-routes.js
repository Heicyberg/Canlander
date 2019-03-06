var db = require("../models");

module.exports = function(app) {

  const redirectLogin = (req,res,next) =>{
    if(!req.session.userId){
      console.log("no user found")
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

  const userCheck = (req,res,next) =>{
    const {userName,password} = req.body
    db.Users.findOne({where:{user_name:userName}}).then(function(data){
      if (data){
        exists = true;
        res.redirect('/register')
      }else{
        exists = false;
        next()
      }
    })
  }

  app.post("/login",redirectHome,function(req, res) {
    const {userName,password} = req.body
    console.log("--- here's req.body from login page---")
    console.log({userName,password})

    if(userName && password){
      db.Users.findOne({where:{
          user_name:userName,
          password:password
        }}).then(function(data) {
            if(data){
              console.log("find user")
              console.log(data.dataValues.user_id)
              req.session.userId =  data.dataValues.user_id
              return res.redirect('/home')
            }else{
              res.redirect('/login')
            }
      })
    }
})

  app.post("/register",redirectHome,userCheck,function(req,res) {
      
    const {userName,password} = req.body
    console.log("--- here's req.body from register page ---")
    console.log({userName,password})
          
      if(userName && password){
        //validation
        if(userName.length<6){
          return res.send("user name has to be at least 6 character long")
        }else if(password.length<6){
          return res.send("password has to be at least 6 character long")
        }else if(exists==true){
          return res.send('user name has been taken, please use another one')
        }else{
          db.Users.create({
            user_name:userName,
            password:password
          }).then(function(user){
            req.session.userId = user.user_id
            return res.redirect('/home')
          })
        }
      }else{
        res.redirect('/register')
      }
  })

  app.post('/logout',redirectLogin,(req,res)=>{
    req.session.destroy(err=>{
      if(err){
        return res.redirect('/home')
      }
     res.clearCookie(SESS_NAME)
     res.redirect('/login')
    })
  })
}
