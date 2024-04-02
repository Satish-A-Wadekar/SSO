const _ = require("lodash");

module.exports = {
  fn_isNullOrUndefined(value) {
    try {
      if (!_.isUndefined(value) && !_.isNull(value)) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  },
};
