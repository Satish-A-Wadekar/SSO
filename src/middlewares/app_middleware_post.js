module.exports = function (app) {
  // add all valid headers which you accept from request
  app.all("*", function (req, res, next) {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type,Authorization,Accept,x-access-token,Origin"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type, Authorization"
    );
    next();
  });
  //  common error handling middleware
  app.use((err, req, res, next) => {
    res.status(err.statusCode || 400).send({
      ...err,
      type: err.name,
      message: err.message,
      status: err.status,
      statusCode: err.statusCode,
    });
  });
};
