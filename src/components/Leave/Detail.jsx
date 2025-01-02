import React, { useState ,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Detail = () => {
    const {id} =useParams();
    const [leave,setLeave]=useState(null)
   
const navigate=useNavigate();

    const changeStatus= async(_id,status)=>{
      try {
        const response = await axios.put(`https://employee-api-wine.vercel.app/api/leave/${id}`,{status}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (response.data.success) {
            navigate('/admin-dashboard/leaves')
        }
    } catch (error) {
     console.log( error.response ? error.response.data.error : "Error fetching employee");
    } 

    }
    useEffect(() => { 
        const fetchEmployeeleave = async () => {
            
            try {
                const response = await axios.get(`https://employee-api-wine.vercel.app/api/leave/detail/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.data.success) {
                    setLeave(response.data.leave);
                }
            } catch (error) {
             console.log( error.response ? error.response.data.error : "Error fetching employee");
            } 
        };
        fetchEmployeeleave();
    }, [id]);
  return (
 <>   {leave ?( 
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
<h2 className='text-2x1 font-bold mb-8 text-center'> Leave Details</h2>

<div>
  <img src={`https://employee-api-wine.vercel.app/${leave.employeeId.userId.profileImage}`} className='rounded-full border w-72'/></div>
      <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'>Name:</p>
        <p className='font-medium'>{leave.employeeId.userId.name}</p>
      </div>

      <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'>EmployeeId:</p>
        <p className='font-medium'>{leave.employeeId.employeeId}</p>
      </div>
      <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'>LeaveType:</p>
        <p className='font-medium'>{leave.leaveType}</p>
      </div>
      <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'>Reason:</p>
        <p className='font-medium'>{leave.reason}</p>
      </div>
      <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'>Department:</p>
        <p className='font-medium'>{leave.employeeId.department.dep_name}</p>
      </div>
      <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'>Start Date</p>
        <p className='font-medium'>{new Date (leave.startDate).toLocaleDateString()}</p>
      </div>
      <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'>End Date</p>
        <p className='font-medium'>{new Date (leave.endDate).toLocaleDateString()}</p>
      </div>
      <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'>{leave.status === "Pending"? "Action":"status"}</p>
        <p className='font-medium'>
          {leave.status==="Pending"?
          (<div className='flex space-x-2'>
            <button className='px-2 py-0.5 bg-teal-300 hover:bg-teal-400' 
          onClick={()=>{changeStatus(leave._id,"Approved")}}>APPROVED</button>
        <button className='px-2 py-0.5 bg-red-300 hover:bg-red-400'
         onClick={()=>{changeStatus(leave._id,"Rejected")}}>REJECTED</button>
         </div>):<p className ='font-medium'>{leave.status}</p>}</p>
      </div>
      </div>
    
   ) :<div>Loading.....</div>}</>
  )
}

export default Detail;
