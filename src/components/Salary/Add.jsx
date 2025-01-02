import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import { getEmployee } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Add = () => {
    const[salary,setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        salary :"",
        departments: null,
        paydate: null
    });
    const [departments, setDepartments] = useState(null);
    const [employees, setEmployees]=useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            console.log(departments)    
            setDepartments(departments);
        };
        getDepartments();
    }, []);
    

  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({ ...prevData, [name]: value }));
        
    };

    const handleDepartment=async (e)=>{

    const emps=await getEmployee (e.target.value)
    setEmployees(emps);
    
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();
        console.log('Salary object:', salary);  
        const salaryData = {
            employeeId:salary.employeeId,
            basicSalary: parseFloat(salary.basicSalary),  // Ensure the salary fields are numbers
            allowances: parseFloat(salary.allowances),
            deductions: parseFloat(salary.deductions),
            payDate:salary.paydate,  // Send payDate as is (string)
          };
        
       
        try {
            const response = await axios.post(`https://employee-api-wine.vercel.app/api/salary/add`, salaryData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json' 
                }
            });
            console.log(response)
            if (response.data.success) {
                navigate('/admin-dashboard/employees');
            }
            console.log(response);
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
           
        }
    };

    return (
        <>
            {departments ? (
                <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
                    <h2 className='text-2xl font-bold mb-6'>Add Salary</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                                <label className='block text-sm font-medium text-gray-700'>Department</label>
                                <select 
                                    name='department'
                                    onChange={handleDepartment}
                    
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required>
                                    <option value="">Select Department</option>
                                    {departments.map((dep) => (
                                        <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                   ) )}
                                </select>
                            </div>
                            <div >
                                <label className='block text-sm font-medium text-gray-700'>Employee</label>
                                <select 
                                    name='employeeId'
                                    
                                    value={salary.employeeId} 
                                    onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required>
                                    <option value="">Select Employee</option>
                                    {employees.map((emp) => (
                                        <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                                   ) )}
                                </select>
                            </div>                           
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>Basicsalary</label>
                                <input 
                                    type='number'
                                    name="basicSalary"
                                    value={salary.basicSalary} 
                                    onChange={handleChange}
                                    placeholder='Basicsalary'
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>Allowances</label>
                                <input 
                                    type="number"
                                    name="allowances"
                                    value={salary.allowances} 
                                    onChange={handleChange}
                                    placeholder='allowanes'
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required
                                /> 
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>Deductions</label>
                                <input 
                                    type="number"
                                    name="deductions" 
                                    value={salary.deductions} 
                                    onChange={handleChange}
                                    placeholder='deduction'
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required
                                /> 
                            </div>
                            
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>Pay Date</label>
                                <input 
                                    type='date'
                                    name="paydate"
                                    value={salary.paydate} 
                                    onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required
                                /> 
                            </div>
                            
                        </div>
                        <button className='mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md'>Add salary</button>
                    </form>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default Add;
