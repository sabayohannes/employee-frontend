import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const List = () => {
  const { id }=useParams();
  const [leaves, setLeaves] = useState([]);
  const{ user }=useAuth();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`https://employee-api-wine.vercel.app/api/leave/${id}/${user.role}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(response.data);
        if (response.data.success) {
          setLeaves(response.data.leave); // Correct property name
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log(error.response)
          alert('Leaves data not found for the given ID.');
        } else {
          console.error('Error fetching leaves:', error);
        }
      }
    };

    fetchLeaves();
  }, [id]); // Dependency on user._id to refetch if the user changes

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Department Name"
          className="px-4 py-0.5 border"
        />
{user.role === "employee" &&
        <Link
          to="/employee-dashboard/add-leave"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Leave
        </Link>}
      </div>

      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
          <tr>
            <th className="px-6 py-3">SNO</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Reason</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr
              key={leave._id} // Use _id from MongoDB for the key
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-3">{index + 1}</td> {/* Use index for SNO */}
              <td className="px-6 py-3">{leave.leaveType}</td>
              <td className="px-6 py-3">
                {new Date(leave.startDate).toLocaleDateString()} {/* Correct Date formatting */}
              </td>
              <td className="px-6 py-3">
                {new Date(leave.endDate).toLocaleDateString()} {/* Correct Date formatting */}
              </td>
              <td className="px-6 py-3">{leave.reason}</td>
              <td className="px-6 py-3">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
  