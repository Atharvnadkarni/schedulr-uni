const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const teacherSchema = new mongoose.Schema({
  name: String,
  subjects: [
    {
      _id: false,
      subject: String,
      classes: [Number],
    },
  ],
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  tier: String
});

teacherSchema.statics.login = async function (username, password) {
  console.log(username, password)
  // validate
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  // check if username exists
  const user = await this.findOne({username});
  if (!user) {
    throw Error("Invalid username");
  }
  const match = await bcrypt.compare(password, user.password)
  const hash = await bcrypt.hash(password, 10)
  console.log(hash, user.password)
  if (!match) {
    throw Error("Incorrect password")
  }
  return user
};

teacherSchema.statics.signup = async function (
  name,
  subjects,
  username,
  password
) {
  // validate
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is weak");
  }

  // check if username exists
  const exists = await this.findOne({ username });
  if (exists) {
    throw Error("Username already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, subjects, username, password: hash });
  return user;
};

module.exports = mongoose.model("Teacher", teacherSchema);
