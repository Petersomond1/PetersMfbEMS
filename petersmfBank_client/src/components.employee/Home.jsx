// Home.jsx
import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'

const Home = () => {
  const [admins, setAdmins] = useState([{}])
  const [summary, setSummary] = useState({
    adminCount: '',
    employeeCount: '',
    totalSalary: ''
  })

  useEffect(() => {
    summaryCount();
    AdminDetails();
  }, [])

  const AdminDetails = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    axios.get(`${API_BASE_URL}/auth/adminDetails`)
    .then(result => {
      if (result.data.Status) {
        setAdmins(result.data.admins)
      } else {
        alert(result.data.Error);
      }
    }
    ).catch(err => console.log(err));
  }

  const summaryCount = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    axios.get(`${API_BASE_URL}/auth/summaryCount`)
    .then(result => {
      if (result.data.Status) {
        setSummary({
          adminCount: result.data.admin,
          employeeCount: result.data.employees,
          totalSalary: result.data.salary
        })
      } else {
        alert(result.data.Error);
      }
    }).catch(err => console.log(err));
  }

  return (
    <div>
      <p>Click on the links to the left to manage employees and departments</p>
      <h2>Summary</h2>
    
      <table className='table'>
        <thead>
          <tr>
            <th>Summary of Authorised Admins</th>
            <th>Summary of Company's Employees</th>
            <th>Summary of Overall Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h3>Total:{summary.adminCount}</h3>
              <hr /> 
              {/* above hr is a horizontal line */}
            </td>
            <td>
              <h3>Total:{summary.employeeCount}</h3>
            <hr />
            </td>
            <td>
              <h3>Total:${summary.totalSalary}</h3>
              <hr />
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{marginTop:'4px', paddingLeft:'5px', paddingRight:'5px', paddingTop:'3px'}}>
        <h3>List of HR System Admins</h3>
        <hr />
        <p>Admins are the super users of the system and have full access to all the features of the system</p>
      <table className='table'>
        <thead>
          <tr>
            <th>Admin ID</th>
            <th>Admin Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Admin Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, id) => (
            <tr key={id}>
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.password}</td>
              <td>{admin.role}</td>
              <td>
                <button className='edit-button'>Edit</button>
                <button className='delete-button'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Home