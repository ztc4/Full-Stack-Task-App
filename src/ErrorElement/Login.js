import React from "react"
import { Link } from "react-router-dom"

export default function LoginFailure(){
    return (
    <div id="login-failure">
        <h1>To access this page you need to login</h1>
        <Link to="login"><p>Click to be sent to the login page</p></Link>


    </div>
    )
}