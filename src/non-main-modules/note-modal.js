import React from "react"
import { useNavigate } from "react-router"
import getCookie from "../Functions/getCookies"
import NoteGroups from "./noteGroupData"
export default function CreateNoteModal({click}){

    const navigate = useNavigate()

    const [note, setNote] = React.useState({
        title: "",
        description: "",
        type: "personal",
        completion: false,
        group: "",
        due: ""
    })


// For Changing the note type
    function changeType(e){
        const {name} = e.target
        if(name === "personal"){
            return setNote( current =>({...current, group: "", type: name }))
        }
      
         setNote( current => ({...current, type: name}))

        

    }


 //Changes state title and description
 
    function noteChange(e){
        const {name, value} = e.target
        setNote( current => ({...current, [name]: value}))


    }



//State for group

    function radioChange(e){
        const {name,value} = e.target
        setNote(current =>({...current, group: value}))
    }


//get groups


    const [groups,setGroups] = React.useState()
    async function getData(){
        fetch("http://localhost:5000/group/get", {
            method: "GET",
            
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie('jwt')}`
            },
            })
            .then(res => res.json())
            .then(res => setGroups(res))
           
    }
//Get Groups -- Call getData functiions
    React.useEffect(()=>{
        getData()
        
    }, [])

    
 
           



//Create the Task

async function handleSubmit(event){
    event.preventDefault()
    console.log(note)
    if(document.cookie = ""){
        return "User isn't logged in"
    }
    if(note.type === "group" && !note.group === ""){

    }
    if(document.cookie == ""){
        return "User isn't logged in"
    }
        if(note.group === "" && note.type === "personal"){
        fetch("http://localhost:5000/tasks/create", {
            method: "POST",
            
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie('jwt')}`
            },
            body: JSON.stringify({title:note.title, description: note.description, type: note.type, completion: note.completion, due: note.due}),
            })
            .then(()=> click())
            .then(()=> navigate(0))
            .catch(error=> console.log(error)).catch(()=> navigate("/login"))
        }
        else{
            console.log("Add Group fetch")
            fetch("http://localhost:5000/group/createTask",{
                method: "POST",
                headers:{
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie('jwt')}`

                },
                body:JSON.stringify({_id: note.group,title:note.title, description: note.description, type: note.type, completion: note.completion, due: note.due})

            })
            .then(()=> click())
            .then(()=> navigate(0))
            .catch(error=> console.log(error)).catch(()=> navigate("/login"))
        }
   


  }
    return(
        <div id='create-note-modal'>
        {/* title - description - completion - type */}
            <form id="note-modal" onSubmit={handleSubmit}>
                <div className="modal-layer">
                    <h1>Create note</h1>
                    <h3 onClick={click}>X</h3>
                </div>
                
                    <div className="note-input-field">
                        <label for="title"name>Title :</label>
                        <input type="text" name="title" value={note.title} onChange={noteChange}></input>


                    </div>
                    <div className="note-input-field note-input-description">
                        <label for="title">Description :</label>
                        <textarea name="description" value={note.description} onChange={noteChange}></textarea>
                    </div>
                    <div className="note-two-layer">
                        <div className="note-input-field">
                            <label for="title">Type:</label>
                            <button type="button" name="personal" className={note["type"] === "personal" ? "sort-button selected": "sort-button"} onClick={changeType}>Personal</button>
                            <button type="button" name="group" className={note["type"] === "group" ? "sort-button selected": "sort-button"} onClick={changeType}>Group</button>
                        
                        </div>
                        <div className="note-input-field">
                            <label for="completion">Completed</label>
                            <button type="button" className={note["completion"] ===  true ? "sort-button selected": "sort-button"} name="completion" onClick={()=>setNote({...note,completion: true})}>True</button>
                            <button type="button" className={note["completion"] === false ? "sort-button selected": "sort-button"}name="completion" onClick={()=>setNote({...note,completion: false})}>false</button>
                        </div>
                        <div className="note-input-field">
                            <label> Due Date:</label>
                            <input type="text" name="due" value={note.due}  id="due" onChange={(event)=>setNote({...note,due: event.target.value})} placeholder="mm/dd/yyyy"></input>
                        </div>
                    </div>
                    {note["type"]=== "group" && 
                    <NoteGroups groups={groups} radioChange={radioChange}/>
                    
                    }
                    <button type="submit"  className="sort-button note-submit-button">Create Note</button>

                    
            </form>
        </div>
    )
}