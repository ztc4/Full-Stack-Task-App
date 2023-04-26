import React from "react"
import getCookie from "../Functions/getCookies"
import { useNavigate } from "react-router-dom"
export default function Join({click, dark}){
    const navigate = useNavigate()


    //State


    const [join,setJoin] = React.useState({
        groupId: '',groupPassword: ""
     })


     //Change state on input value change


     function handleChange(e){
        const {name,value} = e.target
        setJoin(current=> ({
            ...current,
            [name]:value

        }))
    }


    //error from fetch
    
    let [error,setError] = React.useState("");

console.log(error)

    async function handleSubmit(event){
        event.preventDefault()
        if(document.cookie === ""){
            return "User isn't logged in"
        }
        if(document.cookie === ""){
            return "User isn't logged in"
        }

    fetch("http://localhost:5000//group/join", {
        method: "POST",
        
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie('jwt')}`
        },
        body: JSON.stringify({_id:join.groupId, password: join.groupId}),
        })
        .then(res => {console.log(res); return res})
        .then( res=>{return res.json()})
        .then(res =>{
            if(res.status === 404){
                setError("Unable to Join group")
                throw new Error(res.error)
            }
        })
        .then(()=> click())
        .then(()=> navigate(0))
        .catch(error=> console.log(error)).catch(()=> navigate("/login"))

    }
    return(
        <form id="modal-right" onSubmit={handleSubmit} style={dark ? {backgroundColor: "#343541", color:"white"} : {}}>
            <div id="modal-header">
                <h3>Join Group</h3>
                <div onClick={click}>Exit</div>
            </div>
            <div id="modal-body">
                <input type="text" name="groupId" placeholder="Enter Group Id" value={join["group-id"]} onChange={handleChange}></input>
                <input type="text" name="groupPassword" placeholder="Enter Group password" value={join["group-password"]} onChange={handleChange}></input>
                <input type="submit" value="submit"></input>
            </div>
            {error}
        </form>

    )
}