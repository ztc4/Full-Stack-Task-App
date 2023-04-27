import React from "react"
import { useNavigate } from "react-router"
import getCookie from "../Functions/getCookies"
export default function Create({click,dark}){
    const navigate = useNavigate()
    let localhost = "146.190.72.134" || "localhost"
    const [create,setCreate] = React.useState({
        groupName:"",groupPassword: ""
     })
     
     function handleChange(e){
        const {name,value} = e.target
        setCreate(current=> ({
            ...current,
            [name]:value

        }))
    }
    async function handleSubmit(event){
        event.preventDefault()
        if(document.cookie === ""){
            return "User isn't logged in"
        }
        if(document.cookie === ""){
            return "User isn't logged in"
        }

    fetch(`http://${localhost}:5000/group/create`, {
        method: "POST",
        
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie('jwt')}`
        },
        body: JSON.stringify({name: create.groupName, password: create.groupPassword}),
        })
        .then(res =>{
            if(res.ok === false){
                throw new Error(res.error)
            }
            return console.log(res)
        })
        .then(()=> click)
        .then(()=> navigate(0))
        .catch(error=> console.log(error)).catch(()=> navigate("/login"))

    }
    return(
        <div id="modal-right" style={dark ? {backgroundColor: "#343541", color:"white"} : {}}>
            <div id="modal-header">
                <h3>Create Group</h3>
                <div onClick={click}>Exit</div>
            </div>
            <form id="modal-body" onSubmit={handleSubmit}>
                <input type="text" name="groupName" placeholder="Enter Group Name "value={create.groupName} onChange={handleChange}></input>
                <input type="text" name="groupPassword" placeholder="Enter Group Password" value={create.groupPassword} onChange={handleChange}></input>
                <input type="submit" value="submit"></input>
            </form>
        </div>
    )
}