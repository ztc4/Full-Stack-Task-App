import React from "react"
 import "./css/AccountForm.css"
// import "./css/login.css"
import {CiMail,CiLock,CiUser} from "react-icons/ci"
import {Link, useNavigate} from "react-router-dom"
export default function Signup(props){
     const navigate = useNavigate()
        const [info,setInfo] = React.useState(
            {username: "", password: "", fname:"", lname: "", email:""})

    let error;
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

       fetch("http://localhost:5000/user/signup", {
        method: "POST",
        
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        body: JSON.stringify({firstname: info.fname,lastname: info.lname ,username: info.username.toLowerCase(),email:info.email, password: info.password}),
        })
        .then(res => {console.log(res.status); return res.json()})
        .catch(err => {navigate("/login");return error = err})
        .then(res => {console.log(res.token);document.cookie = `jwt=${res.token}`})
        .then(()=> navigate("/"))
       


      }
    
    return (
        <div id="login">
            <button id="backArrow"> ←</button>
            <div id="form101">
                <h1>Create an Account</h1>
                <form id='loginForm' onSubmit={handleSubmit}>
                    <div className="single-input">
                        <label for="fname" id="text1">Enter First Name:</label><br/>
                        <input type="text" id='fname' name="fname" placeholder="First Name" className="input" onChange={handleChange} value={info.fname} required></input><br/>
                    </div>
                    <div className="single-input">
                        <label for="fname" id="text1" className="margin-top">Enter Last Name:</label><br/>
                        <input type="text" id='lname' name="lname" placeholder="First Name" className="input" onChange={handleChange} value={info.lname} required ></input><br/>
                    </div>
                    <div className="single-input">
                        <label for="username" id="text1">Enter Username:</label><br/>
                        <div className="icon-input"><CiUser className="inserted-icon"/><input type="text" id='username' name="username" placeholder="Username" className="input" onChange={handleChange} value={info.username} required></input><br/></div>

                    </div>
                    <div className="single-input">
                        <label for="email" id="text1" className="font-smaller">Enter Email:</label><br/>
                        <div className="icon-input"><CiMail className="inserted-icon"/><input type="text" id='email' name="email" placeholder="Email" className="input" onChange={handleChange} value={info.email} required></input><br/></div>
                    </div>
                    <div className="single-input">
                        <label for="password" id="text2">Enter Password:</label><br/>
                        <div className="icon-input"><CiLock className="inserted-icon"/><input type="password" id='password' name="password" placeholder="Password" className="input" onChange={handleChange} value={info.password} required></input></div>
                    </div> 
                    <p>{error}</p>
                    <input  id="submit2"type="submit" value="Create Account" className={"margin-gap"}></input><br></br>
                    <Link to='/login'><a>Have an account already? Click to Login</a></Link>
                </form>
                
            </div>
        </div>
    )
}
