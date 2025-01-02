import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/LeaveHelper';

import {LeaveButtons} from '../../utils/LeaveHelper';


const Table = () => {
const [leaves,setLeaves]=useState(null);
const [filteredleaves,setFilteredleaves]=useState(null);

    const fetchLeaves=async () =>{
        try {
            const response = await axios.get("https://employee-api-wine.vercel.app/api/leave", {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            });
            console.log(response);
            console.log(response.data.leaves);
  
            if (response.data.success) {

              const data = response.data.leaves.map((leave, index) => ({
                _id: leave._id,
                sno: index + 1, 
                employeeId:leave.employeeId?.employeeId,
                name: leave.employeeId.userId?.name, 
                leaveType:leave.leaveType,
               department: leave.employeeId.department?.dep_name, 
                days:
                new Date(leave.endDate).getDate() - 
                new Date(leave.startDate).getDate(),
                status:leave.status,
                action: (<LeaveButtons Id={leave._id} />),
              }));
    
              setLeaves(data);
              setFilteredleaves(data);
            }  
          } catch (error) {
            console.error("Error fetching employees:", error); // Log any error
          }}
    useEffect(()=>{
        fetchLeaves();
    },[])

const filterByInput=(e)=>{
  const data=leaves.filter((leave)=>
    leave.employeeId.toLowerCase()
    .includes(e.target.value.toLowerCase()));
    
  
  setFilteredleaves(data);
}
 const filterByButton=(status)=>{
  const data=leaves.filter((leave)=>
    leave.status.toLowerCase()
    .includes(status.toLowerCase()));
    
  
  setFilteredleaves(data);
 }

  return (
    <>{filteredleaves?(
    <div className='p-6'>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Emp Id"
          className="px-4 py-0.5 border"
          onChange={filterByInput}
        />
      <div className='space-x-3'>
        <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700' onClick={()=> filterByButton("Pending")}>Pending</button>
        <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'onClick={()=>filterByButton("Approved")}>Approved</button>
        <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'onClick={()=>filterByButton("Rejected")}>Rejected</button>
        </div>
        
      </div>
      <DataTable columns={columns} data={filteredleaves}/>
    </div>):<div>Loading</div>}</>
  )
}

export default Table;
