import React from 'react'
import {Routes, Route}  from "react-router-dom";
import './styles/App.css'
import HomePage from './Pages/HomePage';
import { RegisterPage } from './Pages/auth/RegisterPage';
import { LoginPage } from './Pages/auth/LoginPage';
import { ForgetPasswordPage } from './Pages/auth/ForgetPasswordPage';

function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/forget-password' element={<ForgetPasswordPage/>} />
     </Routes>

    </>
  )
}

export default App