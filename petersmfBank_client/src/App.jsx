import './app.css'
// import Dashboard from './Components/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Home from './Components/Home'
//import Employee from './Components/Employee'
// import Department from './Components/Department'
// import Profile from './Components/Profile'
// import Add_Department from './Components/Add_Department.jsx'
// import Add_Employee from './Components/Add_Employee.jsx'
// import Add_Admin from './Components/Add_Admin.jsx'
// import ViewEmployee from './Components/ViewEmployee'
// import EditEmployee from './Components/EditEmployee'
// import DeleteEmployee from './Components/DeleteEmployee'
import EmployeeLogin from './components.auth/EmployeeLogin.jsx'
// import Employee_Profile from './Components/Employee_Profile.jsx'
// import ProtectRoute from './components.auth/ProtectRoute.jsx'
// import ForgotPassword from './Components/ForgotPassword.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        {/* <Route path="/employee_profile/:id" element={<Employee_Profile />} /> */}
        {/* <Route path="/forgot_password" element={<ForgotPassword />} /> */}
        {/* <Route path="/dashboard" element={<ProtectRoute><Dashboard /></ProtectRoute>}> */}
          {/* <Route path='' element={<Home />} /> */}
          {/* <Route path='/dashboard/employee' element={<Employee />} /> */}
          {/* <Route path='/dashboard/department' element={<Department />} /> */}
          {/* <Route path='/dashboard/profile' element={<Profile />} /> */}
          {/* <Route path='/dashboard/add_department' element={<Add_Department />} /> */}
          {/* <Route path='/dashboard/add_employee' element={<Add_Employee />} /> */}
          {/* <Route path='/dashboard/add_admin' element={<Add_Admin />} /> */}
          {/* <Route path='/dashboard/view_employee/:id' element={<ViewEmployee />} /> */}
          {/* <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />} /> */}
          {/* <Route path='/dashboard/delete_employee/:id' element={<DeleteEmployee />} /> */}
       {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App