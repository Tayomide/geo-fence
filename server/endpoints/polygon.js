const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Polygon = require("../models/polygon")

router.get("/", async (req, res) => {
  if(!req.isAuth){
    res.send({error: "User is not authorized!"})
    return
  }
  const userId = new mongoose.Types.ObjectId(req.userId)
  const polygons = await Polygon.find({
    userId: userId
  })
  console.log("polygons", polygons)
  res.send(polygons.map(polygon => {
    const newPolygon = {}
    newPolygon.id = polygon.id
    newPolygon.userId = polygon.userId
    newPolygon.type = polygon.type
    newPolygon.coordinates = polygon.coordinates
    return newPolygon
  }))
})

router.post("/", async (req, res) => {
  if(!req.isAuth){
    res.send({error: "User is not authorized!"})
    return
  }
  const { polygons } = req.body
  for(const polygon of polygons){
    if(polygon.id){
      if(polygon.deleted){
        await Polygon.findOneAndDelete({"_id": polygon.id})
        continue
      }
      const updatedPolygon = {}
      updatedPolygon.coordinates = polygon.coordinates
      await Polygon.findOneAndUpdate({"_id": polygon.id}, updatedPolygon)
    }else{
      if(polygon.deleted)continue
      const newPolygon = await Polygon({
        userId: new mongoose.Types.ObjectId(req.userId),
        type: polygon.type,
        coordinates: polygon.coordinates
      })
      newPolygon.save()
    }
  }
  return res.send({
    message: "Updated successfully"
  })
})

module.exports = router