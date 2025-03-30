import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use environment variable
const IMAGE_BASE_URL = import.meta.env.VITE_REACT_APP_IMAGE_BASE_URL;

//const Employee = (employeelist ) => {
const Employee = () => {
    const [employee, setEmployee] = useState([
           { name: '', email: '', password: '', position: '', department: '', salary: '', address: '', employee_Image: '', employment_status: '', employment_date: '', department_id: ''}
         ]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/auth/employee`)
            .then(result => {
                if (result.data.Status) {
                    setEmployee(result.data.employee);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`${API_BASE_URL}/auth/delete_employee/${id}`)
            .then(result => {
                if (result.data.Status) {
                    alert(result.data.Status);
                    window.location.reload();
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));
    };

    return (
        <div>
            <h3>Employee List</h3>
            <button className='add-employee'>
                <strong><Link to="/dashboard/add_employee" style={{ color: 'green' }}>Add Employee</Link></strong>
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Employee Email</th>
                        <th>Assigned Password</th>
                        <th>Position/Rank</th>
                        <th>Department</th>
                        <th>Salary/Rate</th>
                        <th>Address/Branch</th>
                        <th>Image</th>
                        <th>Employment Status</th>
                        <th>Employment Date</th>
                        <th>Department ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employee.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.password}</td>
                            <td>{emp.position}</td>
                            <td>{emp.department}</td>
                            <td>{emp.salary}</td>
                            <td>{emp.address}</td>
                            {emp.employee_Image && <td><img 
    src={employee.image ? `${IMAGE_BASE_URL}/${employee.image}` : 'https://via.placeholder.com/150'}
    alt="Employee Image"
    style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover' }} 
/></td>}
                            <td>{emp.employment_status}</td>
                            <td>{emp.employment_date}</td>
                            <td>{emp.department_id}</td>
                            <td>
                                <button><Link to={`/dashboard/view_employee/${emp.id}`}>View</Link></button>
                                <button><Link to={`/dashboard/edit_employee/${emp.id}`}>Edit</Link></button>
                                <button onClick={() => handleDelete(emp.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employee;




// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const Employee = (employeelist) => {
//   const [employee, setEmployee] = useState([
//     { name: '', email: '', password: '', position: '', department: '', salary: '', address: '', employee_Image: '', employment_status: '', employment_date: '', department_id: ''}
//   ])
//   const navigate = useNavigate();
//    useEffect(() => {
//     axios.get("http://localhost:3000/auth/employee")
//     .then(result => {
//       if (result.data.Status) {
//           setEmployee(result.data.employee)
//       } else {
//            alert(result.data.Error);
//          }
//    }).catch(err => console.log(err));
// }, [])

// const handleDelete = async (id) => {
//   await axios.delete(`http://localhost:3000/auth/delete_employee/${id}`)
//   .then(result => {
//       if (result.data.Status) {
//           alert(result.data.Status);
//           window.location.reload();
//       } else {
//           alert(result.data.Error);
//       }
//   }).catch(err => console.log(err));
// }

//   return (
//     <div>
//     <div>
//         <h3>Employee List</h3>
//     </div>
//     <div>
//        <button className='add-employee'> <strong><Link to="/dashboard/add_employee" style={{color:'green'}} >Add Employee</Link></strong></button>
//      </div>
//        <table>
//         <thead>
//             <tr>
//                 <th>Employee ID</th>
//                 <th>Employee Name</th>
//                 <th>Employee Email</th>
//                 <th>Assigned Password</th>
//                 <th>Position/Rank</th>
//                 <th>Department </th>
//                 <th>Salary/Rate</th>
//                 <th>Address/Branch</th>
//                 <th>Select Image</th>
//                 <th>Employment_status</th>
//                 <th>Employment_date</th>
//                 <th>department_id</th>
//                 <th>Action</th>
//             </tr>
//         </thead>
//         <tbody>
//         {employee.map((employee, id) => (
//           <tr key={id}>
//             <td>{employee.id}</td>
//             <td>{employee.name}</td>
//             <td>{employee.email}</td>
//             <td>{employee.password}</td>
//             <td>{employee.position}</td>
//             <td>{employee.department}</td>
//             <td>{employee.salary}</td>
//             <td>{employee.address}</td>
//             {employee.employee_Image && <td><img src={`http://localhost:3000/${employee.employee_Image}`} className='employee_image' alt="" /></td>}
//             <td>{employee.employment_status}</td>
//             <td>{employee.employment_date}</td>
//             <td>{employee.department_id}</td>
//             <td>
//             <button className='view-button'><Link to={`/dashboard/view_employee/`+employee.id}>View</Link></button>
//             <button className='edit-button'><Link to={`/dashboard/edit_employee/`+employee.id}>Edit</Link></button>
//             <button className='delete-button' onClick={() => handleDelete(employee.id)}>Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//      </table>  
// </div>
// )
// }

// export default Employee
