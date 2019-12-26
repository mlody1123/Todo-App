const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  googleID: {
    type: String
  }
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
