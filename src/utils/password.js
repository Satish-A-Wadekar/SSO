const crypto = require("crypto");
const { BSON, EJSON, ObjectId } = require("bson");

module.exports = {
  fn_verifyPassword(
    existing_salt,
    existing_hashed_password,
    user_input_password
  ) {
    try {
      return new Promise((resolve, reject) => {
        crypto.pbkdf2(
          user_input_password,
          existing_salt,
          310000, //iterations
          32, //keylen
          "sha256", //digest,
          (err, user_input_password_hashed) => {
            if (err) {
              reject(err);
            }
            if (
              !crypto.timingSafeEqual(
                existing_hashed_password,
                user_input_password_hashed
              )
            ) {
              reject(false);
            }
            resolve(true);
          }
        );
      });
    } catch (e) {
      throw e;
    }
  },
  fn_convertHashPassword(user_input_password) {
    try {
      const salt = crypto.randomBytes(16);
      return new Promise((resolve, reject) => {
        crypto.pbkdf2(
          user_input_password,
          salt,
          310000, //iterations
          32, //keylen
          "sha256", //digest,
          (err, user_input_password_hashed) => {
            if (err) {
              reject({
                isConverted: false,
                ...err,
              });
            }
            resolve({
              salt,
              password: user_input_password_hashed,
              isConverted: true,
            });
          }
        );
      });
    } catch (e) {
      throw e;
    }
  },
};
