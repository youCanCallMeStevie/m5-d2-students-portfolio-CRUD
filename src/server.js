const express = require("express")
const studentRoutes = require("./services") //automatically with grab index file in that folder
const cors = require("cors")
const server = express()
const port = 3002
server.use(cors())
server.use(express.json())
server.use("/students", studentRoutes)
server.listen(port, () => {
  console.log("Server running on port:", port)
})
