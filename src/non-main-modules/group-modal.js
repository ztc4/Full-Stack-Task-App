import React from "react"
import Join from "./join"
import Create from "./create"
import Current from "./current"
import getCookie from "../Functions/getCookies"
export default function GroupModal({click,dark}){


React.useEffect(()=>{
        getData()
    }, [])
    
const [page,setPage] = React.useState({page: "current"}) 


//Change Choose which page to route to
    function getPage(){
        if (page.page === "current"){
            return <Current click={click} data={info} dark={dark}/>
        } else if(page.page === "join"){
            return <Join click={click} dark={dark}/>
        }
        else if(page.page === "create"){
            return <Create click={click} dark={dark}/>
        }
        else{
            return " error"
        }

    }

    let localhost = "146.190.72.134" || "localhost"
//info sent to current
    const [info,setData] = React.useState("");

//Get Data for current group
    async function getData(){
        fetch(`http://${localhost}:5000/group/get`, {
            method: "GET",
            
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie('jwt')}`
            },
            })
            .then(res => res.json())
            .then(res => setData(res))
           
    }
    return(
        <div className="modal-background">
        
            <div className="modal">
                    <div id="modal-left">
                        <ul>
                            <li onClick={()=>setPage({page: "current"})}>Current Group</li>
                            <li onClick={()=>setPage({page: "join"})}>Join Group</li>
                            <li onClick={()=>setPage({page: "create"})}>Create Group</li>
                        </ul>
                    </div>
                    {getPage() }


            </div>
        </div>

    )
}