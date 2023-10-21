const bcrypt = require("bcryptjs")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

module.exports = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({email: email})
  if(!user){
    res.status(400).send("Invalid Credentials!")
    return
  }
  const isEqual = await bcrypt.compare(password, user.password)
  if(!isEqual){
    res.status(400).send("Invalid Credentials!") // Change to invalid credentials
    return
  }
  const token = jwt.sign({userId: user.id, email: user.email}, process.env.JWT_SECRET, {
    expiresIn: '1h'
  }) // Move key to env
  res.send({
    userId: user.id,
    token: token,
    tokenExpiration: new Date(new Date().getTime() + (60*60*1000)),
    boundaries: user.boundaries?.length ? user.boundaries : []
  })
}