const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const InstagramStrategy = require("passport-instagram").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const SpotifyStrategy = require("passport-spotify").Strategy;

const User = mongoose.model("users");
const Keys = require("../configuration");
const UserService = require("./user_service");

// whatever info we have received from oAuth process, the serializeUser() method generates the identifiable piece of info from it
// which we can use with cookie to save at browser side
passport.serializeUser((user, done) => {
  // done(error, options)
  done(null, user.id); // this user.id is mongoDB UNIQUE ID (record level id) which will be represent in all oAuth providers like google, facebook, linkedin
});

// whatever info we have save at cookie, we can use to process further e.g. "decision making logic"
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    // done(error, options)
    done(null, user);
  });
});

//====================================================================================================
//Google passport strategy middleware
passport.use(
  //create new instance of GoogleStrategy
  new GoogleStrategy(
    {
      clientID: Keys.googleClientID,
      clientSecret: Keys.googleClientSecretKey,
      callbackURL: "/oauth/google/authorised_callback",
      proxy: true, // support both http & https
      state: true, // used to prevent CSRF attacks
    },
    //callback handler
    async (accessToken, refreshToken, profile, done) => {
      //done() callback tells passport pkg that we have finished the process after we received what we wanted from oAuth and now you may continue further with oAuth
      // if we don't call done() callback then our browser will stop in loading state
      const existingUser = await User.findOne({ profileId: profile.id }); // profile.id is a property we received from Google, but in other oAuth process like facebook, linkedin etc it may varies

      if (existingUser) {
        // done(error, options)
        return done(null, existingUser); // 1st param is null because there is no error
      }
      // create new user record
      return await UserService.fn_createNewUser("google", profile, done);
    }
  )
);

//====================================================================================================
//facebook passport strategy middleware
passport.use(
  //create new instance of GoogleStrategy
  new FacebookStrategy(
    {
      clientID: Keys.facebookClientID,
      clientSecret: Keys.facebookClientSecretKey,
      callbackURL: "/oauth/facebook/authorised_callback",
      proxy: true, // support both http & https
      state: true, // used to prevent CSRF attacks
      profileFields: [
        "id",
        "first_name",
        "last_name",
        "email",
        "gender",
        "birthday",
      ],
    },
    //callback handler
    async (accessToken, refreshToken, profile, done) => {
      //done() callback tells passport pkg that we have finished the process after we received what we wanted from oAuth and now you may continue further with oAuth
      // if we don't call done() callback then our browser will stop in loading state
      const existingUser = await User.findOne({ profileId: profile.id }); // profile.id is a property we received from Google, but in other oAuth process like facebook, linkedin etc it may varies

      if (existingUser) {
        // done(error, options)
        return done(null, existingUser); // 1st param is null because there is no error
      }
      // create new user record
      return await UserService.fn_createNewUser("facebook", profile, done);
    }
  )
);

//====================================================================================================
//GitHub passport strategy middleware
passport.use(
  //create new instance of GoogleStrategy
  new GitHubStrategy(
    {
      clientID: Keys.gitHubClientID,
      clientSecret: Keys.gitHubClientSecretKey,
      callbackURL: "/oauth/github/authorised_callback",
      proxy: true, // support both http & https
      state: true, // used to prevent CSRF attacks
      scope: ["user:email"],
    },
    //callback handler
    async (accessToken, refreshToken, profile, done) => {
      //done() callback tells passport pkg that we have finished the process after we received what we wanted from oAuth and now you may continue further with oAuth
      // if we don't call done() callback then our browser will stop in loading state
      const existingUser = await User.findOne({
        profileId: profile.id,
      }); // profile.id is a property we received from Google, but in other oAuth process like facebook, linkedin etc it may varies

      if (existingUser) {
        // done(error, options)
        return done(null, existingUser); // 1st param is null because there is no error
      }

      // create new user record
      return await UserService.fn_createNewUser("github", profile, done);
    }
  )
);

//====================================================================================================
//Spotify passport strategy middleware
passport.use(
  //create new instance of SpotifyStrategy
  new SpotifyStrategy(
    {
      clientID: Keys.spotifyClientID,
      clientSecret: Keys.spotifyClientSecretKey,
      callbackURL: "/oauth/spotify/authorised_callback",
      proxy: true, // support both http & https
      state: true, // used to prevent CSRF attacks
      scope: ["user-read-email", "user-read-private"],
    },
    //callback handler
    async (accessToken, refreshToken, profile, done) => {
      //done() callback tells passport pkg that we have finished the process after we received what we wanted from oAuth and now you may continue further with oAuth
      // if we don't call done() callback then our browser will stop in loading state
      const existingUser = await User.findOne({
        profileId: profile.id,
      }); // profile.id is a property we received from Google, but in other oAuth process like facebook, linkedin etc it may varies

      if (existingUser) {
        // done(error, options)
        return done(null, existingUser); // 1st param is null because there is no error
      }

      // create new user record
      return await UserService.fn_createNewUser("spotify", profile, done);
    }
  )
);

//====================================================================================================
//  Local DB passport strategy middleware
passport.use(
  //  create new instance of GoogleStrategy
  new LocalStrategy(
    {
      passReqToCallback: true,
      session: true,
      usernameField: "username",
      passwordField: "password",
    },
    async (req, username, password, done) => {
      //  find single user by its unique "username"
      const existingUser = await User.findOne(
        {
          provider: "local",
          username: username,
        }, // parameters
        "username provider password first_name" // select columns which you wants to fetch
      );

      // if user found then verify the password
      if (existingUser) {
        return await existingUser.comparePassword(
          password,
          function (err, isMatch) {
            if (err || !isMatch) {
              return done(new Error("Incorrect username or password"), null);
            }
            return done(null, existingUser);
          }
        );
      }

      // create new user record, if existing user not found by username
      return await UserService.fn_createNewUser(
        "local",
        { username, password },
        done
      );
    }
  )
);

//====================================================================================================
//instagram passport strategy middleware
passport.use(
  //create new instance of GoogleStrategy
  new InstagramStrategy(
    {
      clientID: Keys.instagramClientID,
      clientSecret: Keys.instagramClientSecretKey,
      callbackURL: "/oauth/instagram/authorised_callback",
      proxy: true, // support both http & https
      state: true, // used to prevent CSRF attacks
      profileFields: [
        "public_profile",
        "email",
        //'instagram_graph_user_profile',
      ],
    },
    //callback handler
    async (accessToken, refreshToken, profile, done) => {
      //done() callback tells passport pkg that we have finished the process after we received what we wanted from oAuth and now you may continue further with oAuth
      // if we don't call done() callback then our browser will stop in loading state
      const existingUser = await User.findOne({ profileId: profile.id }); // profile.id is a property we received from Google, but in other oAuth process like facebook, linkedin etc it may varies

      if (existingUser) {
        // done(error, options)
        return done(null, existingUser); // 1st param is null because there is no error
      }
      // create new user record
      return await UserService.fn_createNewUser("instagram", profile, done);
    }
  )
);

//====================================================================================================
//linkedIn passport strategy middleware
passport.use(
  //create new instance of GoogleStrategy
  new LinkedInStrategy(
    {
      clientID: Keys.linkedInClientID,
      clientSecret: Keys.linkedInClientSecretKey,
      callbackURL: "/oauth/linkedin/authorised_callback",
      proxy: true, // support both http & https
      state: true, // used to prevent CSRF attacks
      scope: ["email", "profile", "openid"],
    },
    //callback handler
    async (accessToken, refreshToken, profile, done) => {
      //done() callback tells passport pkg that we have finished the process after we received what we wanted from oAuth and now you may continue further with oAuth
      // if we don't call done() callback then our browser will stop in loading state
      const existingUser = await User.findOne({
        profileId: profile.id,
      }); // profile.id is a property we received from Google, but in other oAuth process like facebook, linkedin etc it may varies

      if (existingUser) {
        // done(error, options)
        return done(null, existingUser); // 1st param is null because there is no error
      }

      // create new user record
      return await UserService.fn_createNewUser("linkedin", profile, done);
    }
  )
);
