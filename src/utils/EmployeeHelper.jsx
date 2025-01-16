import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const fetchDepartments=async ()=>{
    let departments=[];
    try{
        const response= await axios.get("https://employee-api-wine.vercel.app/api/department",{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem("token")}`,
            },
        });
       
        if(response.data.success){
            
     return response.data.departments
        }
    }catch(error){
if(error.response&&!error.response.data.success)
    alert(error.response.data.error)
    }
    return departments;
};
//fetch employees for salary 

export const getEmployee=async (id)=>{
  let employees=[];
  try{
      const response= await axios.get(`https://employee-api-theta.vercel.app/api/employee/department/${id}`,{
          headers:{
              'Authorization':`Bearer ${localStorage.getItem("token")}`,
          },
      });
     
      if(response.data.success){

     employees=response.data.employees

      }

  }catch(error){
if(error.response&&!error.response.data.success)

  alert(error.response.data.error)
  console.log(error)
  }
  return employees;
};


export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width:"70px"
  },
  {
    name:"Name",
    selector: (row)=>row.name,
    sortable: true,
     width:"130px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
     width:"90px"
  },
  {
    name:"DOB",
    selector:(row)=>row.dob,
      width:"130px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
     width:"100px"
  },
  {
    name: "Action",
    cell: (row) => <EmployeeButtons Id={row._id} />,
    center:"true"
  },
];

export const EmployeeButtons = ({ Id }) => {
    
    const navigate = useNavigate();

    
      return (
        <div className="flex space-x-3">
          <button  className="px-3 py-1 bg-teal-600 text-white"
          onClick={()=>navigate(`/admin-dashboard/employees/${Id}`)}>
            View</button>
          <button className="px-3 py-1 bg-teal-400 text-white"  onClick={()=>navigate(`/admin-dashboard/employees/edit/${Id}`)}>
            Edit</button>
          <button className="px-3 py-1 bg-yellow-600 text-white" onClick={()=> navigate(`/admin-dashboard/employees/salary/${Id}`)}>Salary</button>
          <button className="px-3 py-1 bg-red-600 text-white" onClick={()=> navigate(`/admin-dashboard/employees/leaves/${Id}`)}>Leave</button>
        </div>
      );
    };