import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

const View = () => {
  const [salaries, setSalaries] = useState([]);  // Initialize as an empty array
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const { id } = useParams(); // Get the ID from the URL params
  const {user}=useAuth();


  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get(`https://employee-api-wine.vercel.app/api/salary/${id}/${user.role}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
       
        console.log('Full API Response:', response.data);
                if (response.data.success) {
            const salaryData = Array.isArray(response.data.salary) ? response.data.salary : [response.data.salary];
            console.log('SalarY Data:', salaryData);
            setSalaries(salaryData);
            setFilteredSalaries(salaryData);
           
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert('Salary data not found for the given ID.');
        } else {
          console.error('Error fetching salaries:', error);
        }
      }
    };

    fetchSalaries();
  }, [id]);  // Refetch data whenever `id` changes

  const filterSalaries = (q) => {
    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId.id.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className='overflow-x-auto p-5'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold'>Salary History</h2>
          </div>

          {/* Search Input */}
          <div className='flex justify-end my-3'>
            <input
              type="text"
              placeholder='Search by Emp ID'
              className='border px-2 rounded-md py-0.5 border-gray-300'
              onChange={(e) => filterSalaries(e.target.value)}
            />
          </div>

          {/* Table */}
          {filteredSalaries.length > 0 ? (
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                <tr>
                  <th className='px-6 py-3'>SNO</th>
                  <th className='px-6 py-3'>Emp ID</th>
                  <th className='px-6 py-3'>Salary</th>
                  <th className='px-6 py-3'>Allowance</th>
                  <th className='px-6 py-3'>Deduction</th>
                  <th className='px-6 py-3'>Total</th>
                  <th className='px-6 py-3'>Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary, index) => (
                  <tr key={salary.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <td className='px-6 py-3'>{index + 1}</td> 
                    <td className='px-6 py-3'>{salary.employeeId.employeeId}</td> {/* Render employeeId directly */}
                    <td className='px-6 py-3'>{salary.basicSalary}</td> {/* Render salary */}
                    <td className='px-6 py-3'>{salary.allowances}</td>
                    <td className='px-6 py-3'>{salary.deductions}</td>
                    <td className='px-6 py-3'>{salary.netSalary}</td>
                    <td className='px-6 py-3'>{new Date(salary.payDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No Records</div>
          )}
        </div>
      )}
    </>
  );
};

export default View;
