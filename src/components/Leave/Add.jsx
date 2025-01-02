import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const Add = () => {
  const { user } = useAuth();
  
  const [leave, setLeave] = useState({
    userId: user._id,
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://employee-api-wine.vercel.app/api/leave/add`, 
        leave, // Send leave data here
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        // Redirect to Leaves page after success
        navigate(`/employee-dashboard/leave/${user._id}`);
      } else {
        alert('Failed to submit leave request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting leave request:', error);
      if (error.response && error.response.status === 404) {
        alert('Leave request submission failed.');
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Leave Type</label>
            <select
              name="leaveType"
              value={leave.leaveType}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">From Date</label>
              <input
                type="date"
                name="startDate"
                value={leave.startDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">To Date</label>
              <input
                type="date"
                name="endDate"
                value={leave.endDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="reason"
              value={leave.reason}
              placeholder="Reason"
              onChange={handleChange}
              className="w-full border border-gray-300"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal text-white font-bold py-2 px-4 rounded-md"
          >
            Add Leave
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
