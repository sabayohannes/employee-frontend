import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';


const Setting = () => {
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting(prevSetting => ({
      ...prevSetting,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (setting.newPassword !== setting.confirmPassword) {
      setError("Passwords don't match!");
    } else {
      try {
        const response = await axios.put("http://localhost:5000/api/setting/change-Password", setting, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          navigate("/admin-dashboard/employees");
          setError(""); // Clear the error on successful change
        }
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          setError(error.response.data.error || "An unexpected error occurred.");
        } else {
          console.error('Error fetching settings:', error);
        }
      }
    }
  };

  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
      <h2 className='text-2xl font-bold mb-4'>Change Password</h2>
      <p className='text-red-500'>{error}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='text-sm font-medium text-gray-700'>Old Password</label>
          <input
            type='password'
            name='oldPassword'
            placeholder='Old Password'
            value={setting.oldPassword}
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-700 rounded-md'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='text-sm font-medium text-gray-700'>New Password</label>
          <input
            type='password'
            name='newPassword'
            placeholder='New Password'
            value={setting.newPassword}
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
            required
          />
        </div>
        <div>
          <label className='text-sm font-medium text-gray-700'>Confirm Password</label>
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            value={setting.confirmPassword}
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
            required
          />
        </div>
        <div className='mb-4'>
          <button type='submit' className='w-full bg-teal-600 hover:bg-teal-700 text-white py-2'>
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
