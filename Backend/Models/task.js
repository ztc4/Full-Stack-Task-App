const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,

    },
    description: {
        type: String,
        

    }, 
    completion: {
        type: Boolean,
        required: true,
        default: false,
    },
    type: {
        type: String,
        required: true,

    }, 
    owner:{
  
    },
    due:{
        type: String
    }
}, {timestamps:true})


const Task = mongoose.model("Task", taskSchema)

module.exports = Task
