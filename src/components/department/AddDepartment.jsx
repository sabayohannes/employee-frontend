import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
    const [department,setDepartment]=useState({
        dep_name:'',
        description:''
    })
const navigate=useNavigate();
const handlechange=(e)=>{
    const {name,value}=e.target;
setDepartment({...department, [name] : value})

}

const handleSubmit= async (e)=>{
    e.preventDefault();
try{
const response= await axios.post('https://employee-api-theta.vercel.app/api/department/add',department,{
    headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`
    }
})
if(response.data.success){
    navigate('/admin-dashboard/departments')
}


}catch(error){
    if(error.response && !error.response.data.success){
        alert(error.response.data.error)
    }
}

}

  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
      <div> <h3 className='t ext-2xl font-bold mb-6'>Add Department</h3>
      <form onSubmit={handleSubmit}> 
        <div>
            <label htmlFor="dep_name" 
            className='text-sm font-medium text-gray-700'>Department Name </label>
            <input 
            type='text'
            name='dep_name'
            onChange={handlechange}
            placeholder='enter department name' 
            className='mt-l w-full p-2 border border-gray-300 rounded-md'required
            />
        </div>
        <div> 
        <label htmlFor="description">Description </label>
        <textarea
         name='description'
         placeholder='Description'
         onChange={handlechange}
         className='mt-l p-2 block w-full border border-gray-300 rounded-md'rows="4"></textarea>
        </div>
        <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Add Department</button>
      </form>
       
      </div>

    </div>
  )
}

export default AddDepartment;
