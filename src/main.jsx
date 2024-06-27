import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Addteacher from './components/admin/Teachers/Addteacher.jsx'
import AddRoom from './components/admin/Rooms/AddRoom.jsx'
import MyDuties from './components/teachers/MyDuties.jsx'
import Home from './components/Home.jsx'
import TeacherAllotment from './components/TeacherAllotment.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/teacherAllotment",
        element: <TeacherAllotment/>
      },
      {
        path: "/myduties",
        element: <MyDuties/>
      },
    
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Signup/>
      },
      {
        path: "/addteacher",
        element: <Addteacher/>
      },
      {
        path: "/addroom",
        element: <AddRoom/>
      },
    


    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>

  
)
