const passport = require("passport");
const { fn_login, fn_logout } = require("../controllers/app_controller");
const { fn_get_current_user } = require("../controllers/user_controller");
const { fn_ensureAuthenticated } = require("../services/user_service");
const popupTools = require("popup-tools");

module.exports = (app) => {
  // route handler for Google oAuth
  app.get(
    "/oauth/google",
    passport.authenticate("google", {
      //  asking google to provide following properties from user's profile
      scope: ["profile", "email"],
      display: "popup",
    })
  );
  app.get(
    "/oauth/google/authorised_callback",
    passport.authenticate("google", {
      failureMessage: true,
      failureFlash: true,
      failWithError: true,
    }), // trigger the GoogleStrategy() callback handler > written in passport.js
    (req, res) => {
      res.set({ "content-type": "text/html; charset=utf-8" });
      res.end(popupTools.popupResponse(req.user));
    }
  );

  // route handler for Facebook oAuth
  app.get("/oauth/facebook", passport.authenticate("facebook"));
  app.get(
    "/oauth/facebook/authorised_callback",
    passport.authenticate("facebook", {
      failureMessage: true,
      failureFlash: true,
      failWithError: true,
    }),
    (req, res) => {
      res.set({ "content-type": "text/html; charset=utf-8" });
      res.end(popupTools.popupResponse(req.user));
    }
  );

  // route handler for Spotify oAuth
  app.get(
    "/oauth/spotify",
    passport.authenticate("spotify", {
      scope: ["user-read-email", "user-read-private"],
      showDialog: true,
    })
  );
  app.get(
    "/oauth/spotify/authorised_callback",
    passport.authenticate("spotify", {
      failureMessage: true,
      failureFlash: true,
      failWithError: true,
    }),
    (req, res) => {
      res.set({ "content-type": "text/html; charset=utf-8" });
      res.end(popupTools.popupResponse(req.user));
    }
  );

  // route handler for GitHub oAuth
  app.get(
    "/oauth/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );
  app.get(
    "/oauth/github/authorised_callback",
    passport.authenticate("github", {
      failureMessage: true,
      failureFlash: true,
      failWithError: true,
    }),
    (req, res) => {
      res.set({ "content-type": "text/html; charset=utf-8" });
      res.end(popupTools.popupResponse(req.user));
    }
  );

  // route handler for Local oAuth
  app.post(
    "/oauth/local",
    passport.authenticate("local", {
      successFlash: true,
      successMessage: true,
      failureMessage: true,
      failureFlash: true,
      failWithError: true,
    }),
    (req, res) => {
      res.status(200).send(req.user);
    }
  );

  app.get("/api/login", fn_login);
  app.get("/api/logout", fn_logout);
  app.get("/api/current_user", [fn_ensureAuthenticated], fn_get_current_user);
  app.get("/api/error", (req, res) => {
    res.status(400).send({ message: "Server error !..." });
  });
  app.get("/api/success", (req, res) => {
    res.status(400).send({ message: "success" });
  });

  // route handler for Instagram oAuth
  app.get("/oauth/instagram", passport.authenticate("instagram"));
  app.get(
    "/oauth/instagram/authorised_callback",
    passport.authenticate("instagram", {
      failureMessage: true,
      failureFlash: true,
      failWithError: true,
    }),
    (req, res) => {
      res.set({ "content-type": "text/html; charset=utf-8" });
      res.end(popupTools.popupResponse(req.user));
    }
  );

  // route handler for LinkedIn oAuth
  app.get("/oauth/linkedin", passport.authenticate("linkedin"));
  app.get(
    "/oauth/linkedin/authorised_callback",
    passport.authenticate("linkedin", {
      failureMessage: true,
      failureFlash: true,
      failWithError: true,
    }),
    (req, res) => {
      res.set({ "content-type": "text/html; charset=utf-8" });
      res.end(popupTools.popupResponse(req.user));
    }
  );
};
