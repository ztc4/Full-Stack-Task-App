const jwt = require("jsonwebtoken")
const User = require("../Models/user")

const auth = async( req,res,next)=>{
    try{

        //Take Token and decode to get User Id out of it
        const token = await req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, "SecretCode")
        const user = await User.findOne({_id: decoded._id, "tokens.token": token})

        // Passing the found user on to the next function in request
        req.user = user
        req.token = token


        next()
    }catch(e){
       console.log("error getting data")
       res.send()
    }
}
module.exports = auth