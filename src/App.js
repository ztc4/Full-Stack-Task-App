import React from "react"
import Nav from "./nav"
import {Outlet} from "react-router-dom"
import { useCookies} from 'react-cookie'
import "./css/HomeScreen.css"
import { Link } from "react-router-dom"
function App() {

  const [currentPersonal, changePersonal] = React.useState(true)
  function onClick(){
    changePersonal( current => !current);

  }
  function list(){
    if(currentPersonal){
      return(
        <ul>
          <li>Add Task</li>
          <li>Give due Date</li>
          <li>Sort Task</li>
          <li>Quickly Complete Task</li>
        </ul>
      )
    }
    else{
      return(
        <ul>
          <li>Join Group</li>
          <li>Create Group</li>
          <li>Assign Task to Group</li>
          <li>Edit Group Task</li>
          <li>Track Completed Group Task</li>
        </ul>
      )
      
    }
  }

  return (
    <div id="home-screen">
        <div id="animated-task-falling" className="task-card">
        <h2>Task card</h2>
        <p></p>
        </div>
        <div className="page intro-page">

        <h1 className="title">TaskNizer</h1>
        

        <div id="image-101">

        </div>
        <div className="page-links">
          <Link to="/login"><button className="page-button">Login</button></Link>
          <Link to="/login"><button className="page-button">Signup</button></Link>
          </div>

 


      </div>
      <div className="page" id="explanation-page">
        <div className="white-half half">
          <h1>Easy way to track, sort and share task within a group</h1>
          <p>Quickly share and delete task within a work environment</p>
        </div>
        <div className="picture-half half"></div>
      </div>

      <div className="page features-page">
        <h1 className="page-headers"> Features</h1>
        <div className="section-feature">
          <div className="picture-half">
            <div id="feature-image"></div>
          </div>
          <div id="feature-seperator">
            <button className={currentPersonal? "feature-button-active": ""} onClick={onClick}>Personal</button>
            <div></div>
            <button id="group-seperator" className={!currentPersonal? "feature-button-active": ""}onClick={onClick}>Group</button>
          </div>
          
          <div className="white-half">
              {list()}

          </div>
        </div>
        
      </div>

      


    </div>
  );
}

export default App;
