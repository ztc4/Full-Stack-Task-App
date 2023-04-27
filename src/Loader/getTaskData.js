
import { redirect} from "react-router"

export default async function getData(){
   let localhost = "146.190.72.134" || "localhost"
    function getCookie(name){
        let cookies = document.cookie
        cookies = cookies.split(";")
        cookies = cookies.filter(cookie => !cookie.includes("name"))[0]
        if(!cookies){
            
        throw new Response(" Couldn't get it")
        }
        cookies = cookies.replace(`${name}=`, "")
        // console.log(`1 ${cookies}`)
        return cookies
        
        }




    let cookies = getCookie("jwt");
    if(!cookies){
        throw new Error("You have to login")
    }


    const tasks = await fetch(`http://${localhost}:5000/tasks/get`,{
        method: "GET", 
        headers:{
            Authorization: `Bearer ${cookies}`
        }
    }).then(res => res.json()).then((res)=> {
        if(res.error){
            console.log(res.error)
           throw new Response("Couldn't get task")
        }
        return res
    })


     const groupTask =  await fetch(`http://${localhost}:5000/group/getTask`,{
        method: "GET", 
        headers:{
            Authorization: `Bearer ${cookies}`
        }
    })
    .then(res => res.json())
    .then((res)=> {
        if(res.error){
            console.log(res.error)
           throw new Response("Couldn't get task")
        }
        return res
    })

console.log(tasks, groupTask)
return [...tasks, ...groupTask]



}