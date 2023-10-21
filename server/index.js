const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const isAuth = require("./middleware/is-auth")
const login = require("./endpoints/login")
const user = require("./endpoints/user")
const signup = require("./endpoints/signup")

require("dotenv").config()

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.g3dp0ky.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`

const app = express()
app.use(express.json())
app.use(cors())

app.use(isAuth)

const PORT = 3000

app.post("/login", login)
app.post("/signup", signup)
app.use("/user", user)

mongoose.connect(uri)
.then(() => {
  app.listen(PORT, () => {
    console.log("Server started")
    console.log(`Server located at http://localhost:${PORT}`)
  })
})
.catch(err => {
  console.log(err)
})
