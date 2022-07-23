import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
export default function index() {
  return (
     <Routes>
        <Route path='/' >
         <Route path='login' element={<Login/>}/>
         <Route path='register' element={<Register/>}/>
         <Route path='forgotpassword' element={<ForgotPassword/>}/>
        </Route>
     
     </Routes>
  )
}
