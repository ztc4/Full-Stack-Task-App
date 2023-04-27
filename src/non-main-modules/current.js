import React from "react"
import getCookie from "../Functions/getCookies"
import{ CiSquareMore} from "react-icons/ci"

export default function Current({click, data, dark}){
    let localhost = "146.190.72.134" || "localhost"
    const information = [...data]
    console.log(information)
    const[options,setMoreOptions] = React.useState({x: "",y:""})

    async function LeaveGroup(current){
        console.log("Leave Group")
        fetch(`http://${localhost}:5000/groups/leave`,{
            method: "DELETE",
        
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie('jwt')}`
            },
            body: JSON.stringify({_id: current._id}),
            })

    }
    async function ShowInfo(current){
        console.log("Show Info")
        console.log(current)

    }

    function openMoreOptions(e){
        setMoreOptions({x: e.clientX, y: e.clientY})
    }
    const styledComponent ={
        height: 100,
        width: 100,
        backgroundColor: "#36373a",
        position: "absolute",
        left: options.x, 
        top: options.y,
        border: "2px solid black",
        display: "flex",
        flexDirection: "column",
        zIndex: 4,
        borderRadius: 10,
    }


     const elements = information.map( current => {
        return(
        <div className="modal-current" onClick={openMoreOptions}>
            <h5 >{`${current.Name}`}</h5>
            <div><CiSquareMore/></div>
            { options.x&& 
            <div style={styledComponent} id="options">
                <button onClick={()=>ShowInfo(current)} >Info</button>
                <hr></hr>
                <button onClick={()=>LeaveGroup(current)}  >Leave Group</button>
            </div>}
        </div>

     )})

        function closeBackground(event){
            const {id} = event.target
                if(id === "modal-right" || id=== "modal-header" ||id === "modal-body"){
                    setMoreOptions({x: "",y:""})
                }
                }
    
  




    return(
        <div id="modal-right" onClick={closeBackground} style={dark ? {backgroundColor: "#343541", color:"white"} : {}}>
            <div id="modal-header">
                <h3>Current Groups</h3>
                <div onClick={click}>Exit</div>
            </div>
            <div id="modal-body" >
               {elements}

            </div>
        </div>

    )
} 