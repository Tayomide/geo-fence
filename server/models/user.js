const { Schema, model } = require("mongoose")

const userSchema = Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
})

module.exports = model("Users", userSchema)