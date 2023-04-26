import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import Login from "./login"
import Signup from "./signup"
import LoggedIn from "./loggedIn"
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import LoginFailure from "./ErrorElement/Login"
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );



//Loaders
import getData from "./Loader/getTaskData.js"



//------------------------------------

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App/>, 
    // errorElement:,
  },
  {
    path: "/login",

    element: <Login/>,
    
  },
  {
    path:"/signup",
    element:<Signup/>,
  }
  ,{
    path : "/",
    element: <LoggedIn/>,
    errorElement:<LoginFailure/>,
    loader: getData,
  }
])

 ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router}/>  
  </React.StrictMode>
  , document.getElementById("root"))


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals