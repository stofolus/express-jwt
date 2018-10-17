const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const environment = process.env.NODE_ENV;
const stage = require("../config")[environment];

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: "String",
    require: true,
    trim: true,
    unique: true
  },
  password: {
    type: "String",
    required: true,
    trim: true
  }
});

userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified || !user.isNew) {
    next();
    return;
  }
  bcrypt.hash(user.password, stage.saltingRounds, function(err, hash) {
    if (err) {
      console.log("Error hashing password for user", user.name);
      next(err);
      return;
    }
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", userSchema);
