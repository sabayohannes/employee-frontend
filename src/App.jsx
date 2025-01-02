import { useState } from 'react'
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AuthContext , { useAuth } from "./context/AuthContext";
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import List from './components/employee/List.jsx';
import Add from './components/employee/Add.jsx';
import View from './components/employee/view.jsx';
import Edit from './components/employee/Edit.jsx';
import AddSalary from './components/Salary/Add.jsx';
import SalaryView  from './components/Salary/View.jsx';
import SummaryCard from './components/EmployeeDashboard/Summary.jsx';
import LeaveList from "./components/Leave/List.jsx";
import AddLeave from "./components/Leave/Add.jsx"; 
import Setting from "./components/EmployeeDashboard/Setting.jsx"; 
import Table from './components/Leave/Table.jsx';
import Detail from './components/Leave/Detail.jsx';

 



function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to ="/admin-dashboard"/>}>      </Route>
      <Route path='/login' element={<Login/>}>  </Route>
      <Route path='/admin-dashboard' element={
        <PrivateRoutes>
          <RoleBaseRoutes  requiredRole={["admin"]}>
          <AdminDashboard/>
          </RoleBaseRoutes>
          </PrivateRoutes>
          
        }>            
        
        <Route  index element={<AdminSummary/>}></Route>
        <Route  path="/admin-dashboard/departments"element={<DepartmentList/>}></Route>
        <Route  path="/admin-dashboard/add-department"element={<AddDepartment/>}></Route>
        <Route  path="/admin-dashboard/department/:id"element={<EditDepartment/>}></Route>
        <Route  path="/admin-dashboard/employees" element={<List/>}></Route>
        <Route  path="/admin-dashboard/employees/:id" element={<View/>}></Route>
        <Route  path="/admin-dashboard/add-employees" element={<Add/>}></Route>
        <Route  path="/admin-dashboard/employees/edit/:id" element={<Edit/>}></Route>
        <Route  path="/admin-dashboard/salary/add" element={<AddSalary/>}></Route>
        <Route  path="/admin-dashboard/leaves" element={<Table />}></Route>
        <Route  path="/admin-dashboard/leaves/:id" element={<Detail />}></Route>
        <Route  path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />}></Route>
        <Route  path="/admin-dashboard/employees/salary/:id" element={<SalaryView />}></Route>
        <Route path="/admin-dashboard/setting"element={<Setting/>}></Route>

        
         
        
            </Route>

        
      <Route path='/employee-dashboard' element={
        <PrivateRoutes>
        <RoleBaseRoutes requiredRole={["admin","employee"]}>
        <EmployeeDashboard/>

        </RoleBaseRoutes>
        </PrivateRoutes>}> 
        <Route  index element={<SummaryCard/>}></Route>
        <Route  path="/employee-dashboard/profile/:id"element={<View/>}></Route>
        <Route  path="/employee-dashboard/leave/:id" element={<LeaveList/>}></Route>
        <Route  path="/employee-dashboard/add-Leave" element={<AddLeave/>}></Route>
        <Route  path="/employee-dashboard/salary/:id" element={<SalaryView/>}></Route>
        <Route  path="/employee-dashboard/setting" element={<Setting />}></Route>
       </Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
