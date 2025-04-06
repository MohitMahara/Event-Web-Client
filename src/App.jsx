import React from 'react'
import {Routes, Route}  from "react-router-dom";
import './styles/App.css'
import HomePage from './Pages/HomePage';
import { RegisterPage } from './Pages/auth/RegisterPage';
import { LoginPage } from './Pages/auth/LoginPage';
import { ForgetPasswordPage } from './Pages/auth/ForgetPasswordPage';
import { UserDashboard } from './Components/Dashboards/UserDashboard';
import { AttendedEventsPage } from './Components/Profile/AttendedEventsPage';
import { BrowseEventsPage } from './Pages/Event/BrowseEventsPage';

function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/forget-password' element={<ForgetPasswordPage/>} />
        <Route path='/user-dashboard' element={<UserDashboard/>} />
        <Route path='/attended-events' element={<AttendedEventsPage/>} />
        <Route path='/browse-events' element={<BrowseEventsPage/>} />

     </Routes>

    </>
  )
}

export default App