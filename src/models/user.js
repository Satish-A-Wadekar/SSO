const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: String,
  last_name: String,
  gender: String,
  dob: Date,
  email: {
    type: String,
    lowercase: true,
    dropDups: [true, ""], //must have but no duplicates
    //  if you want to validate before save/update
    /*
    validate: {
      validator: (email) => User._isExist({ email }),
      message: ({ value }) => `Email ${value} has been taken already.`,
    },
    */
  },
  picture: String,
  profileId: {
    type: String,
  },
  // unique composite key with "provider" & "username"
  provider: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    dropDups: [true, ""], //  must have but no duplicates
    //  uncomment: if you want to validate before save/update any record
    /*
    validate: {
      validator: (username) => User._isExist({ username }),
      message: ({ value }) => `Username ${value} has been taken already.`,
    },
    */
  },
  password: {
    type: String,
  },
});

//  convert the plain text password to hashed string before save
UserSchema.pre("save", function (next) {
  const user = this;
  const SALT_FACTOR = 10;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

//  compare password before login
UserSchema.methods.comparePassword = function (user_input_password, done) {
  bcrypt.compare(user_input_password, this.password, function (err, isMatch) {
    if (err) return done(err);
    done(null, isMatch);
  });
};

//  Validator: evaluate data before save/update
UserSchema.statics._isExist = async function (options) {
  return (await this.where(options).countDocuments) === 0;
};

//  adding composite unique key for "email", "provider" & "username"
UserSchema.index({ email: 1, provider: 1, username: 1 }, { unique: true });

//  this will create a new collection in MongoDB, if does not exist
//  (@Note: call it only once throughout application, otherwise it will create multiple user collections)
const User = mongoose.model("users", UserSchema);
