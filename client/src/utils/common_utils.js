import _ from "lodash";

export const fn_isNullOrUndefined = (value) => {
  try {
    if (
      (!_.isUndefined(value) || !_.isNull(value)) &&
      !_.isUndefined(value.length)
    ) {
      return true;
    }
  } catch (e) {
    return false;
  }
};
