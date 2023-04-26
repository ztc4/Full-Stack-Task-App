const mongoose = require("mongoose")



const GroupTaskSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    owner:{
        
    },
    password:{
        type: String,
        required: true,
    },
    members:[
        
    ],
    tasks:[{
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
        due:{
            type: String
        }
    }],

})
GroupTaskSchema.post("save", async function(next){
    if(this.members.length === 0){
        GroupTask.findByIdAndDelete(this._id).then(()=> console.log("deleted")).catch(()=> console.log("couldn't delete"))

     }
 

})

const GroupTask = mongoose.model("Group-Task",GroupTaskSchema)
module.exports =  GroupTask