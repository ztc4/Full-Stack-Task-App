const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require('dotenv').config()
//Connect to Database
require("../db/mongoose")
const port = process.env.PORT || 5000
//Insert routes
const UserRouter = require("../Routers/userRouter")
const TaskRouter = require("../Routers/TaskRouter")
const groupTask = require("../Routers/groupTaskRouter")

const application = express()
application.use(cors({origin: "http://localhost:3000"}))
application.use(express.json())

application.use(UserRouter)
application.use(groupTask)
application.use(TaskRouter)
application.use(cookieParser())


application.listen(port, ()=> console.log("Application is up"))


//Check if server is up
application.get("/home", async(req, res)=>{

 res.cookie("zachary", "mekemdmdemeo").send("Page sent")

 
})
