//  separates user level controller, if-required you can add-on user level rout handler logic here later

module.exports = {
  fn_get_current_user(req, res, next) {
    try {
      //  "cookie-session" pkg extract the cookies saved in browser side and save it in "req.session" property
      //  then "passport.js" extract the passport session id from "req.session" and pass that data to "passport.deserialise()" function
      //  req.session = null;
      res.status(200).send(req.user);
    } catch (err) {
      res.status(err.statusCode || 400).send(err);
    }
  },
};
