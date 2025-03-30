import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_REACT_APP_IMAGE_BASE_URL;

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        position: "",
        department: "",
        salary: "",
        address: "",
        employment_status: "",
        employment_date: "",
        department_id: "",
    });

    const [department, setDepartment] = useState([
      {id: '', name: '', head: '', description: '', status: ''}
    ]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/auth/department`)
        .then(result => {
            if (result.data.Status) {
                setDepartment(result.data.department);
            } else {
                alert(result.data.Error);
            }
        }).catch(err => console.log(err));

        axios.get(`${API_BASE_URL}/auth/employee/${id}`)
        .then(result => {
            if (result.data.Status) {
                setEmployee(e => ({
                    ...e,
                    name: result.data.employee.name,
                    email: result.data.employee.email,
                    position: result.data.employee.position,
                    department: result.data.employee.department,
                    salary: result.data.employee.salary,
                    address: result.data.employee.address,
                    employment_status: result.data.employee.employment_status,
                    employment_date: result.data.employee.employment_date,
                    department_id: result.data.employee.department_id
                }));
            } else {
                alert(result.data.Error);
            }
        }).catch(err => console.log(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${API_BASE_URL}/auth/edit_employee/${id}`, employee)
        .then(result => {
            if (result.data.Status) {
                alert("Employee updated successfully!");
                navigate("/dashboard/employee");
            } else {
                alert(result.data.Error);
            }
        }).catch(err => console.log(err));
    };

    return (
    <div>
      <h2> Edit Employee Record</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="inputName">
            {" "}
            Name
            <input
              type="text"
              placeholder="Enter Employee Name Here"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
              id="inputName"
              className="form-control"
              autoComplete="off"
              style={{
                formControl: "plaintext",
                width: "100%",
                rounded: "50%",
              }}
            />
          </label>
        </div>
        <br />
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="inputEmail4">
            Email
            <input
              type="email"
              placeholder="Enter Employee Email"
                value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
              id="inputEmail4"
              className="form-control"
              autoComplete="off"
              style={{
                formControl: "plaintext",
                width: "100%",
                rounded: "50%",
              }}
            />
          </label>
        </div>
       {/* we removed the password field from the form because after initial assigning of password, it is the duty of an employee to update his/her password. */}
        <br />
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="inputPosition">
            Position/Rank:
            <input
              type="text"
              placeholder="Enter Employee Position/Rank"
                value={employee.position}
              onChange={(e) =>
                setEmployee({ ...employee, position: e.target.value })
              }
              id="inputPosition"
              className="form-control"
              autoComplete="off"
              style={{
                formControl: "plaintext",
                width: "100%",
                rounded: "50%",
              }}
            />
          </label>
        </div>
        <br />
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="inputDepartment">
            Department
            <input
              type="text"
              placeholder="Enter Department Name"
                value={employee.department}
              onChange={(e) =>
                setEmployee({ ...employee, department: e.target.value })
              }
              id="inputDepartment"
              className="form-control"
              autoComplete="off"
              style={{
                formControl: "plaintext",
                width: "100%",
                rounded: "50%",
              }}
            />
          </label>
        </div>
        <br />
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="inputSalary">
            Salary/Rate
            <input
              type="text"
              placeholder="Enter Employee Salary/Rate"
                value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
              id="inputSalary"
              className="form-control"
              autoComplete="off"
              style={{
                formControl: "plaintext",
                width: "100%",
                rounded: "50%",
              }}
            />
          </label>
        </div>
        <br />
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="address">
            Address/Branch
            <input
              type="text"
              placeholder="Enter Address: 1234 Main street"
                value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
              id="inputAddress"
              className="form-control"
              autoComplete="off"
              style={{
                formControl: "plaintext",
                width: "100%",
                rounded: "50%",
              }}
            />
          </label>
        </div>
        <br />
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="employment_status">
            Employment_status
            <input
              type="text"
              placeholder="Enter employment_status"
                value={employee.employment_status}
              onChange={(e) =>
                setEmployee({ ...employee, employment_status: e.target.value })
              }
              id="inputEmployment_status"
              className="form-control"
              autoComplete="off"
              style={{
                formControl: "plaintext",
                width: "100%",
                rounded: "50%",
              }}
            />
          </label>
        </div>
        <br />
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="employment_date">
            Employment_date
            <input
              type="date"
              placeholder="Enter Employment_date"
                value={employee.employment_date}
              onChange={(e) =>
                setEmployee({ ...employee, employment_date: e.target.value })
              }
              id="inputEmployment_date"
              className="form-control"
              autoComplete="off"
              style={{ formControl: "Date", width: "100%", rounded: "50%" }}
            />
          </label>
        </div>
        <br />
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="department_id">
            Department_id
            <select
              id="inputDepartment_id"
              className="form-control"
              onChange={(e) =>
                setEmployee({ ...employee, department_id: e.target.value })
              }
              style={{ formControl: "select", width: "100%", rounded: "50%" }}
            >
              <option>Choose...</option>
              {department.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <br />
        <button type="submit" style={{ color: "green" }}>
          Edit An Employee Record
        </button>
      </form>
    </div>
  )
}

export default EditEmployee



// import React, {useState, useEffect} from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import '../index.css'
// import { useNavigate } from 'react-router-dom'


// const EditEmployee = () => {
//     const {id} = useParams()
//     const [employee, setEmployee] = useState({
//         name: '',
//         email: '',
//         position: '',
//         department: '',
//         salary: '',
//         address: '',
//         employment_status: '',
//         employment_date: '',
//         department_id: ''
//     });
//     const navigate = useNavigate();
//     const [department, setDepartment] = useState([
//         {id: '', name: '', head: '', description: '', status: ''}
//     ])

//     useEffect(() => {
//         axios.get('http://localhost:3000/auth/department')
//         .then(result => {
//            if (result.data.Status) {
//                setDepartment(result.data.department)
//            } else {
//                 alert(result.data.Error);
//               }
//         }).catch(err => console.log(err));

//         axios.get(`http://localhost:3000/auth/employee/${id}`)
//         .then(result => {
//             if (result.data.Status) {
//                 setEmployee({
//                     ...employee,
//                     name: result.data.employee.name,
//                     email: result.data.employee.email,
//                     position: result.data.employee.position,
//                     department: result.data.employee.department,
//                     salary: result.data.employee.salary,
//                     address: result.data.employee.address,
//                     employment_status: result.data.employee.employment_status,
//                     employment_date: result.data.employee.employment_date,
//                     department_id: result.data.employee.department_id
//                 })
//             } else {
//                 alert(result.data.Error);
//             }
//         }).catch(err => console.log(err));
//     }, [])

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await axios.put(`http://localhost:3000/auth/edit_employee/${id}`, employee)
//         .then(result => {
//             if (result.data.Status) {
//                 alert(result.data.Status);
//                 navigate('/dashboard/employee')
//             } else {
//                 alert(result.data.Error);
//             }
//         }).catch(err => console.log(err));
//     }
 
//   return (
//     <div>
//       <h2> Edit Employee Record</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "3px" }}>
//           <label htmlFor="inputName">
//             {" "}
//             Name
//             <input
//               type="text"
//               placeholder="Enter Employee Name Here"
//               value={employee.name}
//               onChange={(e) =>
//                 setEmployee({ ...employee, name: e.target.value })
//               }
//               id="inputName"
//               className="form-control"
//               autoComplete="off"
//               style={{
//                 formControl: "plaintext",
//                 width: "100%",
//                 rounded: "50%",
//               }}
//             />
//           </label>
//         </div>
//         <br />
//         <div style={{ marginBottom: "3px" }}>
//           <label htmlFor="inputEmail4">
//             Email
//             <input
//               type="email"
//               placeholder="Enter Employee Email"
//                 value={employee.email}
//               onChange={(e) =>
//                 setEmployee({ ...employee, email: e.target.value })
//               }
//               id="inputEmail4"
//               className="form-control"
//               autoComplete="off"
//               style={{
//                 formControl: "plaintext",
//                 width: "100%",
//                 rounded: "50%",
//               }}
//             />
//           </label>
//         </div>
//        {/* we removed the password field from the form because after initial assigning of password, it is the duty of an employee to update his/her password. */}
//         <br />
//         <div style={{ marginBottom: "3px" }}>
//           <label htmlFor="inputPosition">
//             Position/Rank:
//             <input
//               type="text"
//               placeholder="Enter Employee Position/Rank"
//                 value={employee.position}
//               onChange={(e) =>
//                 setEmployee({ ...employee, position: e.target.value })
//               }
//               id="inputPosition"
//               className="form-control"
//               autoComplete="off"
//               style={{
//                 formControl: "plaintext",
//                 width: "100%",
//                 rounded: "50%",
//               }}
//             />
//           </label>
//         </div>
//         <br />
//         <div style={{ marginBottom: "3px" }}>
//           <label htmlFor="inputDepartment">
//             Department
//             <input
//               type="text"
//               placeholder="Enter Department Name"
//                 value={employee.department}
//               onChange={(e) =>
//                 setEmployee({ ...employee, department: e.target.value })
//               }
//               id="inputDepartment"
//               className="form-control"
//               autoComplete="off"
//               style={{
//                 formControl: "plaintext",
//                 width: "100%",
//                 rounded: "50%",
//               }}
//             />
//           </label>
//         </div>
//         <br />
//         <div style={{ marginBottom: "3px" }}>
//           <label htmlFor="inputSalary">
//             Salary/Rate
//             <input
//               type="text"
//               placeholder="Enter Employee Salary/Rate"
//                 value={employee.salary}
//               onChange={(e) =>
//                 setEmployee({ ...employee, salary: e.target.value })
//               }
//               id="inputSalary"
//               className="form-control"
//               autoComplete="off"
//               style={{
//                 formControl: "plaintext",
//                 width: "100%",
//                 rounded: "50%",
//               }}
//             />
//           </label>
//         </div>
//         <br />
//         <div style={{ marginBottom: "3px" }}>
//           <label htmlFor="address">
//             Address/Branch
//             <input
//               type="text"
//               placeholder="Enter Address: 1234 Main street"
//                 value={employee.address}
//               onChange={(e) =>
//                 setEmployee({ ...employee, address: e.target.value })
//               }
//               id="inputAddress"
//               className="form-control"
//               autoComplete="off"
//               style={{
//                 formControl: "plaintext",
//                 width: "100%",
//                 rounded: "50%",
//               }}
//             />
//           </label>
//         </div>
//         <br />
//         <div style={{ marginBottom: "3px" }}>
//           <label htmlFor="employment_status">
//             Employment_status
//             <input
//               type="text"
//               placeholder="Enter employment_status"
//                 value={employee.employment_status}
//               onChange={(e) =>
//                 setEmployee({ ...employee, employment_status: e.target.value })
//               }
//               id="inputEmployment_status"
//               className="form-control"
//               autoComplete="off"
//               style={{
//                 formControl: "plaintext",
//                 width: "100%",
//                 rounded: "50%",
//               }}
//             />
//           </label>
//         </div>
//         <br />
//         <div style={{ marginBottom: "3px" }}>
//           <label htmlFor="employment_date">
//             Employment_date
//             <input
//               type="date"
//               placeholder="Enter Employment_date"
//                 value={employee.employment_date}
//               onChange={(e) =>
//                 setEmployee({ ...employee, employment_date: e.target.value })
//               }
//               id="inputEmployment_date"
//               className="form-control"
//               autoComplete="off"
//               style={{ formControl: "Date", width: "100%", rounded: "50%" }}
//             />
//           </label>
//         </div>
//         <br />
//         <div style={{ marginBottom: "3px" }}>
//           <label htmlFor="department_id">
//             Department_id
//             <select
//               id="inputDepartment_id"
//               className="form-control"
//               onChange={(e) =>
//                 setEmployee({ ...employee, department_id: e.target.value })
//               }
//               style={{ formControl: "select", width: "100%", rounded: "50%" }}
//             >
//               <option>Choose...</option>
//               {department.map((department) => (
//                 <option key={department.id} value={department.id}>
//                   {department.name}
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>
//         <br />
//         <button type="submit" style={{ color: "green" }}>
//           Edit An Employee Record
//         </button>
//       </form>
//     </div>
//   )
// }

// export default EditEmployee