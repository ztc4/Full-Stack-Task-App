import React from "react"
import getCookie from "../Functions/getCookies"
export default function EditNote({click, id, dark, title, type}){
    let localhost = "146.190.72.134" || "localhost"
    const [task,setTask] = React.useState({_id: id,title: "", description: "",due: "",completion: "",type:"" })
    async function getTask(){
        
        console.log("current id", id)
            await fetch(`http://${localhost}:5000/${type == "personal"? "tasks/find": "groupTask/find"}`, {
            method: "POST",
            
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie('jwt')}`
            },
            body: JSON.stringify({_id: id}),
            })
            .then(res=> res.json())
            .then(res => {console.log(res);return( res.task[0])})
            .then((res) => {
              setTask(current =>({...current,description: res.description, title: res.title, due: res.due, completion: res.completion, type: res.type}))
            })
          

    }

    React.useEffect(()=>{

            getTask()
               
                
             
             
             }, [])
             console.log(task)
    async function deleteTask(){
        console.log(console.log)
        fetch(`http://${localhost}:5000/${task.type === "personal"? "tasks/delete" : "group/delete"}`,{
            method: "DELETE",
        
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie('jwt')}`
            },
            body: JSON.stringify(task),
            })

        await setTimeout(click, 200)
        
        
        
    }
    async function handleSubmit(e){
        e.preventDefault()
        console.log(task.group)
        
            fetch(`http://${localhost}:5000/${task.type === "personal"? "tasks/edit" : "group/edit"}`,{
                method: "PUT",
            
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie('jwt')}`
                },
                body: JSON.stringify(task),
                }

            )
            await setTimeout(click, 200)


    }

    return(
        <div className="modal-background">
            <div className="modal">
                <div id="modal-left" className="edit-note">
                        <li >Edit Note</li>
                            <div>
                                <li onClick={()=>deleteTask()}>Delete Note</li>
                                <li onClick={click}>Cancel</li>
                            </div>
                    
                                
                </div>
                <div id="modal-right" style={dark ? {backgroundColor: "#343541", color: "white",} : {}}>
                    <h2>Edit Task</h2>
                        <form id="modal-body" style={{paddingTop:"10px", display: "flex"}} onSubmit={handleSubmit}>
                            <label for="title" style={{margin: "-20px 0"}}>title</label>
                            <input placeholder="title" name="title" value={task.title} onChange={(e)=> setTask({...task, title: e.target.value})}></input>
                            <label for="title">Description :</label>
                            <textarea name="description" value={task.description} style={{backgroundColor: "#222222",color:"white", height: "200px", width: "80%"}} onChange={(e)=> setTask({...task, description: e.target.value})}></textarea>
                            <label for="due">Due:</label>
                            <input type="text" name="due" value={task.due}  style={{margin: 0}} onChange={(event)=>setTask((current)=>({...current,due: event.target.value}))} placeholder="mm/dd/yyyy"></input>

                            <div className="note-input-field">
                                <label for="completion">Completed</label>
                                <button type="button" className={task.completion ===  true ? "sort-button selected edit-button-border": "sort-button"} name="completion" onClick={()=>setTask({...task,completion: true})}>True</button>
                                <button type="button" className={task.completion === false ? "sort-button selected edit-button-border": "sort-button"}name="completion" onClick={()=>setTask({...task,completion: false})}>false</button>
                            </div>
                            <input type="Submit" style={{margin: " 20px 0",}}></input>
                        </form>
                </div>
            </div>
            
        </div>
    )

}