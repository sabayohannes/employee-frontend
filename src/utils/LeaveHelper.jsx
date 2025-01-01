
import  { useNavigate } from 'react-router-dom'

export const columns = [
    {
      name: "S No",
      selector: (row) => row.sno,
      width:"70px"
    },
    {
      name:"Emp ID",
      selector: (row)=>row.employeeId,
      sortable: true,
       width:"130px"
    },
    {
        name:"Name",
        selector: (row)=>row.name,
        sortable: true,
         width:"130px"
      },
   
    {
      name:"Leave type",
      selector:(row)=>row.leaveType,
        width:"130px"
    },
    {
      name: "Department",
      selector: (row) => row.department,
       width:"100px"
    },
    {
        name:"Days",
        selector:(row)=>row.days,
        width:"80px"
    },
    {
        name:"Status",
        selector: (row)=>row.status,
         width:"130px"
      },
    {
      name: "Action",
      cell: (row) => <LeaveButtons Id={row._id} />,
      center:"true"
    },
  ];
  export const LeaveButtons=({Id})=>{
    const navigate=useNavigate();
    const handleView=(id)=>{
        navigate(`/admin-dashboard/leaves/${id}`)
            }
            return(
                <button className='px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600' onClick={()=>handleView(Id)}>
                    VIEW 
                </button>
            )
  }
  