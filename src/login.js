import React from "react"
// import "./css/login.css"
import { Outlet, Link, useNavigate } from "react-router-dom"
import { CiUser as User, CiLock as Password, CiLogin} from "react-icons/ci"

import"./css/AccountForm.css"
export default function Login(props){
    let localhost = "146.190.72.134" || "localhost"
    const navigate = useNavigate()
        const [info,setInfo] = React.useState(
            {username: "", password: ""})

            const [error, setError] = React.useState("")
       function handleChange(event){
        const {name,value} = event.target
        setInfo(prevData =>{
            return {
                ...prevData,
                [name]: value
            }
        })
       }
        
      async function handleSubmit(event){
        event.preventDefault()
        setError("")

       fetch(`http://${localhost}:5000/user/login`, {
        method: "POST",
        
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        body: JSON.stringify({username: info.username.toLowerCase(), password: info.password}),
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                setError(res.error)
                throw new Error("Couldn't login")
            };
            document.cookie = `jwt=${res.token}`
            console.log(document.cookie)
        })
        .then(()=> navigate("/"))
        .catch(err=> {
            console.log(err);
            // setError(err)
        })
       


      }
    
    return (
        <div id="login">
            <button id="backArrow"> ←</button>
            <div id="form101">
                <h1>Login to Account</h1>
                
                <form id='loginForm' onSubmit={handleSubmit}>
                    <div className="single-input">
                        <label for="username" id="text1">Enter Username:</label><br/>
                        <div  className="icon-input">
                            <User className="inserted-icon"/>
                            <input type="text" id='username' name="username" placeholder={"Username"} className="input" onChange={handleChange} value={info.username}></input><br/>
                        </div>
                    </div>
                    <div className="single-input">
                        <label for="password" id="text2">Enter Password:</label><br/>
                        <div className="icon-input">
                            <Password className="inserted-icon"/>
                            <input type="password" id='password' name="password" placeholder="Password" className="input" onChange={handleChange} value={info.password}></input>
                        </div>
                    </div>
                   <input  id="submit2"type="submit" value="Login"></input><br></br>
                    <Link to='/signup'>Don't have an account? Click to Signup!</Link>
                </form>
                {error && <h1>{error}</h1>}
            </div>
        </div>
    )
}
