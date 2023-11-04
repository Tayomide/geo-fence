const { Schema, model } = require("mongoose")

const polygonSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Polygon']
  },
  coordinates: {
    type: [[[Number]]],
    required: true
  },
})

polygonSchema.index({geometry: "2dsphere"})

module.exports = model("Polygon", polygonSchema)