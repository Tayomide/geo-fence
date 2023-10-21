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
  boundaries: [[[Number]]]
})

module.exports = model("Users", userSchema)