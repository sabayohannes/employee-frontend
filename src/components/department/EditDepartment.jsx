import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState({ dep_name: '', description: '' });
    const [depLoading, setDepLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => { 
        const fetchDepartment = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.data.success) {
                    setDepartment(response.data.department);
                }
            } catch (error) {
                setError(error.response ? error.response.data.error : "Error fetching department");
            } finally {
                setDepLoading(false);
            }
        };
        fetchDepartment();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
  
        try {
            const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log("Response data:", response.data);
            if (response.data.success) {
                navigate('/admin-dashboard/departments');
            }
        } catch (error) {
            setError(error.response ? error.response.data.error : "Error updating department");
        }
    };

    return (
        <>
            {depLoading ? (
                <div>Loading...</div>
            ) : (
                <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
                    <h3 className='text-2xl font-bold mb-6'>Edit Department</h3>
                    {error && <div className='text-red-500 mb-4'>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="dep_name" className='text-sm font-medium text-gray-700'>Department Name</label>
                            <input
                                type='text'
                                name='dep_name'
                                onChange={handleChange}
                                value={department.dep_name}
                                placeholder='Enter department name'
                                className='mt-l w-full p-2 border border-gray-300 rounded-md'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea
                                name='description'
                                placeholder='Description'
                                onChange={handleChange}
                                value={department.description}
                                className='mt-l p-2 block w-full border border-gray-300 rounded-md'
                                rows="4"
                            ></textarea>
                        </div>
                        <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
                            Edit Department
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default EditDepartment;
