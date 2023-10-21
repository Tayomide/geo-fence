const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = require("../models/user")

router.get("/", async (req, res) => {
  if(!req.isAuth){
    res.send({error: "User is not authorized!"})
    return
  }
  const userId = new mongoose.Types.ObjectId(req.userId)
  const user = await User.findById(userId)
  res.send({
    id: user.id,
    email: user.email,
    boundaries: user.boundaries
  })
})

router.post("/", async (req, res) => {
  if(!req.isAuth){
    res.send({error: "User is not authorized!"})
    return
  }
  const { email, boundaries} = req.body
  const newData = {}
  if(email)newData.email = email
  if(boundaries)newData.boundaries = boundaries
  const usId = new mongoose.Types.ObjectId(req.userId)
  try{
    await User.findOneAndUpdate({"_id": req.userId}, newData, {upsert: true})
  }catch(err){
    res.status(500).send({error: err});
    return
  }
  return res.send('Saved Sucessfully!');
})

module.exports = router