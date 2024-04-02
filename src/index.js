//  load .env file
require("dotenv").config();
//  load packages
const express = require("express");
const mongoose = require("mongoose");

//  load custom modules
//const { PORT, CORS_Options, mongodb_URI } = require('./configuration');
const { host, port, mongodb_URI } = require("./configuration");

//register all MongoDB models first before connect to mongoDB, as it will create the collection first
require("./models");

// Application level initialization/settings
mongoose.Promise = global.Promise;
mongoose.connect(mongodb_URI); //  connect to mongoDB
const app = express();

require("./middlewares/app_middleware_pre")(app, express); //load middleware before routs loading
require("./routes/routes")(app); // load all other routes
require("./middlewares/app_middleware_post")(app); //load middleware after routs loading
require("./services/passport_service");

//  simple ROOT route
app.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "Welcome to Passport.js oAuth application." });
});
//  start app
app.listen(port, () => {
  const running_URI = `http://${host}:${port}`;
  console.log(
    `\nServer is running on port ${port}.\nfull path is ${running_URI}\n`
  );
});
