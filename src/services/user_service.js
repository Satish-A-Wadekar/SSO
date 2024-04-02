const mongoose = require("mongoose");
const User = mongoose.model("users");
const commonUtils = require("../utils/common_utils");

module.exports = {
  fn_createNewUser(provider, profile, done) {
    try {
      let userObject;
      switch (provider) {
        case "google":
          {
            userObject = {
              provider,
              profileId: profile.id,
              first_name: profile._json.given_name,
              last_name: profile._json.family_name,
              email: profile._json.email,
              picture: profile._json.picture,
              username: commonUtils.fn_isNullOrUndefined(profile.username)
                ? profile.username
                : profile._json.email,
            };
          }
          break;
        case "facebook":
        case "instagram":
          {
            userObject = {
              provider,
              profileId: profile.id,
              first_name: profile._json.first_name,
              last_name: profile._json.last_name,
              email: profile._json.email,
              picture: profile.profileUrl,
              gender: profile.gender,
              username: commonUtils.fn_isNullOrUndefined(profile.username)
                ? profile.username
                : profile._json.email,
            };
          }
          break;
        case "github":
          {
            userObject = {
              provider,
              profileId: profile.id,
              first_name: profile._json.name,
              email: profile.emails.length > 0 ? profile.emails[0].value : "",
              picture: profile._json.avatar_url,
              username: commonUtils.fn_isNullOrUndefined(profile.username)
                ? profile.username
                : profile.emails.length > 0
                ? profile.emails[0].value
                : "",
            };
          }
          break;
        case "spotify":
          {
            userObject = {
              provider,
              profileId: profile.id,
              first_name: profile._json.display_name,
              email: profile.emails.length > 0 ? profile.emails[0].value : "",
              picture: profile.photos.length > 0 ? profile.photos[0].value : "",
              username: commonUtils.fn_isNullOrUndefined(profile.username)
                ? profile.username
                : profile.emails.length > 0
                ? profile.emails[0].value
                : "",
            };
          }
          break;
        case "linkedin":
          {
            userObject = {
              provider,
              profileId: profile.id,
              email: profile._json.email,
              username: commonUtils.fn_isNullOrUndefined(profile.username)
                ? profile.username
                : profile._json.email,
            };
          }
          break;
        case "local":
          {
            userObject = {
              provider,
              email: profile.username,
              username: profile.username,
              password: profile.password,
            };
          }
          break;
      }
      // save user data into DB
      return new User(userObject)
        .save()
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err, null);
        });
    } catch (e) {
      return done(e, null);
    }
  },

  //  Simple route middleware to ensure user is authenticated.
  //  Use this route middleware on any resource that needs to be protected.  If
  //  the request is authenticated (typically via a persistent login session),
  //  the request will proceed. else send back with custom error
  fn_ensureAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).send({
        auth: req.isAuthenticated(),
        error: "You must log in!",
      });
    }
    //if (!req.user) return res.status(401).send({ error: "You must log in!" });
    next();
  },

  fn_reqDetails(req, res, next) {
    try {
      console.log({
        originalUrl: req.originalUrl,
        baseUrl: req.baseUrl,
        hostname: req.hostname,
        path: req.path,
        referrer:
          req.headers.referrer || req.headers.referer || req.get("Referrer"),
        protocol: req.protocol,
        route: req.route,
        ip: req.ip,
        body: req.body,
        params: req.params,
        secure: req.secure,
        cookies: req.cookies,
        signedCookies: req.signedCookies,
        fresh: req.fresh,
        stale: req.stale,
        subdomains: req.subdomains,
        xhr: req.xhr,
      });
      next();
    } catch (e) {
      next();
    }
  },
};
