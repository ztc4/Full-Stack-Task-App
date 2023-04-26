const express = require("express")
const Task = require("../Models/task")
const Auth = require("../MiddleWare/AuthJWT")


const router = new express.Router()
// const Task = require("../Models/task")

//Get Task
router.get("/tasks/get", Auth , async(req,res)=>{
    try{const task = await Task.find({owner: req.user._id})
    if(!task){
        throw new Error(" Couldn't find task")
    }
    res.json(task)
}catch(e){
    res.status(404)
}

})
//Create
 
router.post("/tasks/create", Auth, async(req,res)=>{
    try{const task  = new Task({
        title: req.body.title,
        description: req.body.description,
        completion: req.body.completion,
        type: req.body.type,
        due: req.body.due,
        owner: req.user._id,
    })
    if(!task){
        res.send({error: "Couldn't create Task "})
    }

    await task.save()
    res.status(500).send('Task created successfully')}
    catch(err){
        res.send({error: err})
    }
    
})


//delete Task
router.delete("/tasks/delete",Auth, async(req,res)=>{
    try{
        await Task.deleteOne({_id:req.body._id})
        res.status(200)
}
    catch(e){
    res.status(404).send(e)
    }
    
    
})

//Edit Task
router.put("/tasks/edit", Auth, async(req,res)=>{
    console.log(req.body)
   try{ 
    const task = await Task.findOne({_id: req.body._id})
    if(!task){
        throw new Error("Task not found")
    }
    task.title = req.body.title;
    task.description = req.body.description;
    task.completion = req.body.completion;
    task.due = req.body.due;
    await task.save()
    res.send(200)
    console.log("successfully updated")
    }catch(e){
res.status(404).send({error:e})
    }
})
 router.put("/tasks/markcomplete", Auth, async(req,res)=>{
    const task = await Task.findOne({_id: req.body._id})
    task.completion = true
    task.save()
    res.status(200)
 })

//find
router.post("/tasks/find", Auth , async(req,res)=>{
    const task = await Task.find({_id: req.body._id})
    console.log(task)
    console.log("GOT task")
    if(!task){
       res.send("couldn't get task")
    }
    res.status(200).json({task})
   
   
   })

module.exports = router