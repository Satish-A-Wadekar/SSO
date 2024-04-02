//  separates app level controller, if-required you can add-on other app level rout handler logic later
const cookieParser = require("cookie-parser");

module.exports = {
  fn_logout(req, res, next) {
    try {
      //  "req.logout()" function is attached by "passport.js" to the incoming "req" object,
      //  it kills those cookies in browser side which has been saved in login transaction
      req.logout();
      res.status(200).send(req.user);
    } catch (err) {
      res.status(err.statusCode || 400).send(err);
    }
  },
  fn_login(req, res, next) {
    try {
      //  "req.login()" is a function which is attached by "passport.js" to the incoming "req" object,
      //  it kill's those cookies in browser side which has been saved in login transaction
      req.login(req.user, (err) => {
        // process, if user data exist in req object, else redirect user to home page
        if (err) {
          return next(err);
        }
        res.status(200).send(req.user);
      });
      res.status(200).send(req.user);
    } catch (err) {
      res.status(err.statusCode || 400).send(err);
    }
  },
};
