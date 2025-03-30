import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Add_Department = () => {
  const [department, setDepartment] = useState([
    { name: '', head: '', description: '', status: ''}
  ]);
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post('http://localhost:3000/auth/add_department', department)
  //     .then(result =>  {
  //       if (result.data.Status) {
  //         console.log('Department Added Successfully');
  //         navigate('/dashboard/department');
  //       } else {
  //        alert(result.data.Error);
  //       }
  //     })
  //     .catch(err =>  console.log(err));
  // };

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_BASE_URL}/auth/add_department`, department)
      .then((result) => {
        if (result.data.Status) {
          console.log("Department Added Successfully");
          navigate("/dashboard/department");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <div>
      <h2> Add_Department/Unit</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="name">
            <input
              type="text"
              name='name'
              placeholder="Enter Department/name Here"
              onChange={e => setDepartment({ ...department, name: e.target.value })}
              id="text"
              className="form-control"
              style={{ formControl: "plaintext", width: "100%" , rounded: "50%"}}
            />
          </label>
        </div>
        <br />
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="head">
            <input
              type="text"
              name='head'
              placeholder="Enter Department/head Here"
              onChange={e => setDepartment({ ...department, head: e.target.value })}
              id="text"
              className="form-control"
              style={{ formControl: "plaintext", width: "100%" , rounded: "50%"}}
            />
          </label>
        </div>
        <br />
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="description">
            <input
              type="text"
              name='description'
              placeholder="Enter Department/description Here"
              onChange={e => setDepartment({ ...department, description: e.target.value })}
              id="text"
              className="form-control"
              style={{ formControl: "plaintext", width: "100%" , rounded: "50%"}}
            />
          </label>
        </div>
        <br />
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="status">
            <input
              type="text"
              name='status'
              placeholder="Enter Department/status Here"
              onChange={e =>
                setDepartment({ ...department, status: e.target.value })
              }
              id="text"
              className="form-control"
              style={{ formControl: "plaintext", width: "100%" , rounded: "50%"}}
            />
          </label>
        </div>
        <button type="submit" style={{color:'green'}}>Submit</button>
      </form>
    </div>
  )
};

export default Add_Department 
               