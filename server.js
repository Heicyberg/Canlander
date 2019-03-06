// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyPaser = require('body-parser')

const THREE_HOURS = 1000*60*60*3

const {
  PORT = process.env.PORT || 8080,
  NODE_ENV = 'development',
  SESS_LIFE = THREE_HOURS,
  SESS_SECRET = 'KOOLKATS IN THE TOWN',
  SESS_NAME = 'sid'
} = process.env

const IN_PROD = NODE_ENV === 'production'

// Sets up the Express App
// =============================================================
const app = express();

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

app.use(session({
  resave:false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  name:SESS_NAME,
  cookie:{
    maxAge:SESS_LIFE,
    sameSite: true,
    secure: IN_PROD,
  }
}))


app.use((req,res,next)=>{
  const {userId} = req.session
  if (userId) {
      res.locals.user = db.Users.find({
      where:{ user_id :userId}
    })
  }
  next()
})

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
// =============================================================
require("./routes/user-api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

module.exports = app;
