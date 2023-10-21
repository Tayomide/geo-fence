const User = require("../models/user")
const bcrypt = require("bcryptjs")
module.exports = async (req, res) => {
  const { email, password} = req.body

  try{
    const user = await User.findOne({email: email})
    if(user){
      res.status(400).send({error: 'User exists. Please log in'})
      return
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await User({
      email: email,
      password: hashedPassword
    })
    const result = await newUser.save()
    result.password = null
    res.send({
      "id": result.id,
      "email": result.email
    })
  } catch(err) {
    throw err
  }
}