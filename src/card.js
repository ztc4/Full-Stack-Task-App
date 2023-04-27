import React from "react"
import { CiSquareMore } from "react-icons/ci"
import getCookie from "./Functions/getCookies"
import "./css/task.css"
import { deleteModel } from "mongoose"
export default function TaskCard({title,description,toggleTask,completion,due, dark, key, type, _id}){
  let localhost = "146.190.72.134" || "localhost"
const [localCompletion, setLocalCompletion] = React.useState(completion)
const [deleted, setdeleted] = React.useState(false)
  // function runFunction(){
  //   toggleTaskEdit(title,description)
  //   console.log("clicked")

  // }
//   Date.prototype.addDays = function(days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }
async function markComplete(){
  fetch(`http://${localhost}:5000/${type === "personal"? "tasks/markcomplete" : "group/markcomplete"}`,{
    method: "PUT",

    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie('jwt')}`
    },
    body: JSON.stringify({_id: _id, completion: true}),
    }).then(res =>console.log(res))

    setLocalCompletion(true)

}
function handleClick(e){
  const {className, id} = e.target
  if(className.includes("get-classname-click")){
    toggleTask()
  }
  if(id.includes("mark-complete")){
    markComplete()
  }
  

}

function handleDelete(){
  console.log("Successfully delete")
  setdeleted(true)

  fetch(`http://localhost:5000/${type === "personal"? "tasks/delete" : "group/delete"}`,{
    method: "DELETE",

    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie('jwt')}`
    },
    body: JSON.stringify({_id: _id, completion: true}),
    })
}

let date = new Date()
  date.setDate(date.getDate() + 3)
  let p;

  if(new Date(due) < new Date()){
    p = <p style={{color: 'red'}}>Task was due: {due}</p>
  }

return (
<div className={deleted ?"task-card get-classname-click deleted": "task-card get-classname-click"} onClick={handleClick} id={dark && "task-card-dark"}>
  <h2 className="get-classname-click">{title}</h2>
  <p id="description" className="get-classname-click">{description}</p>
  {localCompletion ? <p id="task-card-completed" style={{color: "#01C29A",fontSize:"16px",fontWeight:700, letterSpacing: 2}}>Already Completed</p>: <button onClick={markComplete} id={"mark-complete"}>Complete Task</button>}
  {(new Date(due) < new Date())  && due  ? 
  <p style={{color: 'red'}} className={"get-classname-click"}>{ !localCompletion &&`Task was due: ${due}`}</p> : 
  <p className={new Date(due) > date? "task-safe": !localCompletion&& due && "task-almost"}>{!localCompletion && due}</p>}
  {completion && <button id={"card-delete"} onDoubleClick={()=>handleDelete()}>Delete</button>}
</div>

)
}