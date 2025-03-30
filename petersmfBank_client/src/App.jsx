import './App.css'
import Dashboard from './components.admin/Dashboard.jsx'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components.employee/Home.jsx'
import Employee from './components.employee/Employee.jsx'
import Department from './components.employee/Department.jsx'
 import Profile from './components.employee/Profile.jsx'
import Add_Department from './components.admin/Add_Department.jsx'
import Add_Employee from './components.admin/Add_Employee.jsx'
import Add_Admin from './components.admin/Add_Admin.jsx'
import ViewEmployee from './components.admin/ViewEmployee.jsx'
import EditEmployee from './components.admin/EditEmployee.jsx'
import DeleteEmployee from './components.admin/DeleteEmployee.jsx'
import EmployeeLogin from './components.auth/EmployeeLogin.jsx'
import Employee_Profile from './components.employee/Employee_Profile.jsx'
import ProtectRoute from './components.auth/ProtectRoute.jsx'
import ForgotPassword from './components.auth/ForgotPassword.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        <Route path="/employee_profile/:id" element={<Employee_Profile />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<ProtectRoute><Dashboard /></ProtectRoute>}>
          <Route path='' element={<Home />} />
          <Route path='/dashboard/employee' element={<Employee />} />
          <Route path='/dashboard/department' element={<Department />} />
           <Route path='/dashboard/profile' element={<Profile />} /> 
          <Route path='/dashboard/add_department' element={<Add_Department />} />
          <Route path='/dashboard/add_employee' element={<Add_Employee />} />
          <Route path='/dashboard/add_admin' element={<Add_Admin />} />
          <Route path='/dashboard/view_employee/:id' element={<ViewEmployee />} />
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />} />
          <Route path='/dashboard/delete_employee/:id' element={<DeleteEmployee />} />
       </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App