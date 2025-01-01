import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const view = () => {
    const {id} =useParams();
    const [employee,setEmployee]=useState(null)
    useEffect(() => { 
        const fetchEmployee = async () => {
            
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.data.success) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
             console.log( error.response ? error.response.data.error : "Error fetching employee");
            } 
        };
        fetchEmployee();
    }, [id]);
  return (
 <>   {employee ?( 
    <div>
      <div><img src={`http://localhost:5000/${employee.userId.profileImage}`} className='rounded-full border w-72'/></div>
<h2 className='text-2x1 font-bold mb-8 text-center'> Employee Details</h2>
      <div className='flex space-x-3'>
        <p className='text-lg font-bold'>Name:</p>
        <p className='font-medium'>{employee.userId.name}</p>
      </div>

      <div className='flex space-x-3'>
        <p className='text-lg font-bold'>EmployeeId:</p>
        <p className='font-medium'>{employee.employeeId}</p>
      </div>
      <div className='flex space-x-3'>
        <p className='text-lg font-bold'>Date of Birth:</p>
        <p className='font-medium'>{new Date(employee.dob).toLocaleDateString()}</p>
      </div>
      <div className='flex space-x-3'>
        <p className='text-lg font-bold'>Gender:</p>
        <p className='font-medium'>{employee.gender}</p>
      </div>
      <div className='flex space-x-3'>
        <p className='text-lg font-bold'>Department:</p>
        <p className='font-medium'>{employee.department.dep_name}</p>
      </div>
      <div className='flex space-x-3'>
        <p className='text-lg font-bold'>Marital Status:</p>
        <p className='font-medium'>{employee.maritalStatus}</p>
      </div>

    </div>
   ) :<div>Loading.....</div>}</>
  )
}

export default view;
