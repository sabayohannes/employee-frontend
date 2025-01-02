import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper.jsx';
import DataTable from "react-data-table-component";
import axios from 'axios';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("https://employee-api-wine.vercel.app/api/employee", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          const data = response.data.employees.map((emp, index) => ({
            _id: emp._id,
            profileImage: emp.userId?.profileImage ? (
              <img width={60} className='rounded-full' src={`https://employee-api-wine.vercel.app/${emp.userId.profileImage}`} />
            ) : (
              <img width={60} className='rounded-full' src="default-profile.jpg" /> // Default image if missing
            ),
            sno: index + 1, // Use index for sequential serial number
            name: emp.userId?.name || 'Unknown Name', // Default name if missing
            dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : 'N/A', // Default if dob is missing
            dep_name: emp.department?.dep_name || 'No Department', // Default if dep_name is missing
            action: <EmployeeButtons Id={emp._id} />
          }));

          setEmployees(data);
          setFilteredEmployee(data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error); // Log any error
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployee();
  }, []);

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm)
    );
    setFilteredEmployee(records);
  };

  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employees</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input
          type='text'
          placeholder='Search By Employee Name'
          className='px-4 py-0.5 border'
          onChange={handleFilter}
        />
        <Link to="/admin-dashboard/add-employees" className='px-4 py-1 bg-teal-600 rounded text-white'>
          Add New Employee
        </Link>
      </div>
      <div className='mt-6'>
        {empLoading ? (
          <div>Loading...</div> // Display a loading message or spinner
        ) : (
          <DataTable columns={columns} data={filteredEmployee} pagination />
        )}
      </div>
    </div>
  );
};

export default List;
