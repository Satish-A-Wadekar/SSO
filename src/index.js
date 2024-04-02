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
  /*console.log(
    'App routes list (You need to call)',
    `\n${running_URI}/`,
    `\n${running_URI}/oauth/local`,
    `\n${running_URI}/oauth/google`,
    `\n${running_URI}/oauth/facebook`,
    `\n${running_URI}/oauth/instagram`,
    `\n${running_URI}/oauth/linkedin`,
    `\n${running_URI}/oauth/github`,
    `\n${running_URI}/oauth/spotify`,
    '\n\nApp routes list (do not call, app will handle internally)',
    `\n${running_URI}/oauth/local/authorised_callback`,
    `\n${running_URI}/oauth/google/authorised_callback`,
    `\n${running_URI}/oauth/facebook/authorised_callback`,
    `\n${running_URI}/oauth/linkedin/authorised_callback`,
    `\n${running_URI}/oauth/github/authorised_callback`,
    `\n${running_URI}/oauth/spotify/authorised_callback`,
    `\n${running_URI}/api/logout`,
    `\n${running_URI}/api/current_user`
  );*/
});
