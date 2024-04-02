//load packages
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

//load custom modules
const { host, port, cookieKey } = require("../configuration");

module.exports = function (app, express) {
  // configure all middleware
  app.use(cors({ origin: `http://${host}:${port}` }));
  // parse requests of content-type = application/json
  app.use(express.json());
  // parse requests of content-type = application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  app.use(
    //  because Express.js does not know how to handle cookies, we need to explicitly tell Express.js to use cookie
    // "cookie-session" pkg does the job for us
    cookieSession({
      //secure: true, //for http
      maxAge: 30 * 24 * 60 * 60 * 1000, //expires in 30 Days (30 days, 24 hrs, 60 min, 60 sec, 1000 milliseconds)
      keys: [cookieKey], // what to expires (this key will be automatically encrypt by "cookie-session" pkg)
    })
  );
  // load the cookie-parsing middleware
  app.use(cookieParser());
  //we are explicitly telling passport.js to use cookies throughout the application
  app.use(passport.initialize());
  app.use(passport.session());
  //app.use(flash());
};
