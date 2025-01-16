import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard.jsx'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'
import axios from 'axios'

const AdminSummary = () => {
const [summary,setSummary]=useState(null)

  useEffect(()=>{
    const fetchSummary=async()=>{
      try{

const summary=await axios.get('https://employee-api-theta.vercel.app/api/dashboard/summary',{
  headers:{
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
  
})
setSummary(summary.data);

      }catch(error){
        if(error.response){
          alert(error.response.data)
        }
        console.log(error.message)  
      }
      
    }
    fetchSummary()
  },[])
  if(!summary){
    return<div>Loading</div>
  }
  return (
    <div className='p-6'>
      <h3 className='tect 2x1 font-bold'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={summary.totalEmployees} color="bg-teal-600" />
        <SummaryCard icon={<FaBuilding />} text="Total Department" number={summary.totalDepartment} color="bg-yellow-600" />
        <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number={summary.totalsalary} color="bg-yellow-600" />
      </div>
      <div className='mt-12'>
        <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={summary.leaveSummary.appliedFor}color="bg-teal-600" />
          <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={summary.leaveSummary.Approved} color="bg-green-600" />
          <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={summary.leaveSummary.Pending} color="bg-yellow-600" />
          <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={summary.leaveSummary.Rejected} color="bg-red-600" />
        </div>
      </div>
    </div>
  )
}

export default AdminSummary
