//load respective configuration only
switch (process.env.NODE_ENV) {
  case "production": {
    module.exports = require("./config-prod");
    break;
  }
  case "development":
  default: {
    module.exports = require("./config-dev");
    break;
  }
}
