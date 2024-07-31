const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: String,
    email: String,
    password: {
      type: String,
      required: true,
    },
    first_name: String,
    last_name: String,
    telephone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
