import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import {CiSearch as Search} from "react-icons/ci"
import TaskCard from "./card.js"
import "./css/loggedIn.css"
import CreateNoteModal from "./non-main-modules/note-modal"
import GroupModal from "./non-main-modules/group-modal.js"
import EditModal from "./non-main-modules/edit-note-modal"
import getCookie from "./Functions/getCookies"
import{useLoaderData, useNavigate} from "react-router-dom"
export default function LoggedIn({red}){
    let localhost = "146.190.72.134" || "localhost"
    const navigate = useNavigate()
    //toggle modals
     const[noteActive,setNoteActive] = React.useState(false)
     const[GroupActive,setGroupActice] = React.useState(false)
     const[editTask, setTaskActive] = React.useState({active:false, id:""})

     function toggleNote(){
        setNoteActive(current => !current)
     }

    //DarkMode
    const [dark,setDark] = React.useState(!true)

    //Sort Info
    const [selected,setSelected] = React.useState({search: "", completion: "", type: ""}) 
    // Get Fetch info from Loader
    const data = useLoaderData() || []
    // console.log(data)

   
    // console.log(date2 < date1)
    let tasks = []

    //filters through data based off sort options
    function filterData(data){
        let returnedData = [];
        if(!data.length == 0){
            
        
        for(let i = 0; i < data.length; i++){
            let current = data[i]
         if(current.title?.toLowerCase().includes(selected.search) && (selected.completion === ""? true :current.completion === selected.completion ) && (selected.type === ""? true: current.type.toLowerCase() ===selected.type)){
            returnedData.push(data[i])
         }

        }
    }
       return returnedData


    }
//Passing fetched data into the filterData function and for every piece of data thats valid I'm Making a card for it
 function toggleTaskEdit(_id,type){
    console.log()
    setTaskActive(current=> ({...current, active: !current.active , id: _id, type}))

 }



    if(!data.length == 0){
        tasks = filterData(data).map(task => {
            return(<TaskCard title={`${task.title}`} description={`${task.description}`} 
             completion={task.completion} due={task.due} key={task._id} toggleTask={()=>toggleTaskEdit(task._id,task.type)} 
             dark={dark} type={task.type} _id={task._id}/>)
        })
    } 



//functions for Search bar and due date
    function handleClick(event){
      
        const {name,type,value} = event.target
        if(type === "button"){return setSelected(
            current => ({
                ...current,
                ["day"]:false,
                ["three"]:false,
                ["week"]:false,
                ["year"]:false,
                [name]: !current[name]
            })
        )}
       
        if(type === "text"){
            return setSelected(current =>({
                ...current,
                [name]: value.toLowerCase()
            }))
        }
        
    }

// Function for changing state for Task Type
    function handleClick2(event){
        const {name} = event.target

        if((selected.type === "personal" && name === "personal") ||(selected.type === "group" && name ==="group")){
            return setSelected(current =>({
                ...current,
                type: ""
            }))
        }
        return setSelected(current =>({
            ...current,type: name
        }))
    }

//function for changing completion state
    function handleClick3(event){
        const {name} = event.target

        if((selected.completion === true && name === "complete" )|| (selected.completion === false && name ==="incomplete")){
           return setSelected(currentSelection => ({
                ...currentSelection, completion: "" }))

        }
        return setSelected(current =>({
            ...current, completion : name === "complete" ? true : false
        }))

    }

//Logout
 async function logout(){
    await fetch(`http://${localhost}:5000/user/logout`, {
        method: "POST",
        
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie('jwt')}`
                },
        })
        .then((res)=>console.log(res))
        .then(()=> document.cookie = ``)
        .then(()=> navigate("/login"))
    }
 

    return(
        
        <div id="loggedIn" >
            <form id="sort" >
                
                <div className="searchBar sort-margin">
                    <div></div>
                    <input type="text" name="search" id="searchInput" placeholder="Search for Task?" onChange={handleClick} value={selected["search"] == String? selected["search"] : null}/>
                    <button id='searchIcon' type="button"><Search/></button>
                </div>
                <hr/>
                <h3 className="sort-section">Task Type</h3>
                <div id="taskType" className="sort-margin">
                    <button type="button" className={selected.type === "personal"?"sort-button selected" :"sort-button"} name="personal" onClick={handleClick2}>Personal Task</button>
                    <button type="button" className={selected.type=== "group"?"sort-button selected" :"sort-button"} name="group" onClick={handleClick2} >Group Task</button>
                </div>
                <hr />
                <h3 className="sort-section">Due Date:</h3>
                <div id="Created" className="sort-margin">
                    <button type="button" className={selected["day"]? "sort-button create-margin selected":"sort-button create-margin"} name="day" onClick={handleClick}>1 day</button>
                    <button type="button" className={selected["three"]? "sort-button create-margin selected":"sort-button create-margin"} name="three" onClick={handleClick}>3 days</button>
                    <button type="button" className={selected["week"]? "sort-button create-margin selected":"sort-button create-margin"}name="week" onClick={handleClick}>Week</button>
                    <button type="button" className={selected["year"]? "sort-button create-margin selected":"sort-button create-margin"} name="year"onClick={handleClick}>Year</button>

                </div>
                <hr/>
                <h3 className="sort-section">Completion</h3>
                <div id="Completion" className="sort-margin">
                    <button type="button" className={selected.completion === true?"sort-button selected" :"sort-button"} name="complete" onClick={handleClick3}>Complete</button>
                    <button type="button" className={selected.completion === false?"sort-button selected" :"sort-button"} name="incomplete" onClick={handleClick3}>incomplete</button>
                </div>
                <hr/>
                <h3 className="sort-section">Settings</h3>
                <div id="setting" className="sort-margin">
                    <h4 onClick={()=>setGroupActice(!GroupActive)}>Groups</h4>
                    <h4 onClick={toggleNote}>Create Note</h4>
                    <h4 onClick={()=> setDark(!dark)}>Change Mode</h4>
                    <h4 onClick={logout}>Logout</h4>
                </div>


            </form>
            <div id="task" className={dark? "loggedInWhite background-dark": "loggedInWhite"}>
                {tasks}
            </div>
            {noteActive === true? <CreateNoteModal click={()=>setNoteActive(!noteActive)} dark={dark}/>: ""}
            {GroupActive === true? <GroupModal click={()=>setGroupActice(!GroupActive)} dark= {dark}/>: ""}
            {editTask.active === true && <EditModal click={()=> toggleTaskEdit()} id={editTask.id} dark={dark} type={editTask.type}/>}
        </div>
    )
}
