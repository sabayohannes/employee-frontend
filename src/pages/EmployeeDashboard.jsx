import React from 'react'
import Sidebar from "../components/EmployeeDashboard/Sidebar.jsx"
import Navbar from '../components/dashboard/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import SummaryCard from '../components/EmployeeDashboard/Summary.jsx'

const EmployeeDashboard = () => {

  return (
<div className='flex'>
      <Sidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
         <Navbar/>
         
         <Outlet/>
         </div>   

    </div>
  )
}

export default EmployeeDashboard;
