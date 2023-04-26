const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
//Connect to Database
require("../db/mongoose")

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


application.listen(5000, ()=> console.log("Application is up"))


// Login
application.get("/home", async(req, res)=>{

 res.cookie("zachary", "mekemdmdemeo").send("Page sent")

 
})