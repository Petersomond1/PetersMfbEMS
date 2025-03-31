import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add_Employee = () => {
  const [department, setDepartment] = useState([]);

  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/admin/department`, { withCredentials: true })
      .then((result) => {
        if (result.data.Status) {
          setDepartment(result.data.department);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [API_BASE_URL]);



  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    position: "",
    department: "",
    salary: "",
    address: "",
    employee_Image: "",
    employment_status: "",
    employment_date: "",
    department_id: "",
  });
axios.defaults.withCredentials = true;

const handleSubmit = async (e) => {
  e.preventDefault();
  // const formData = new FormData();
  // Object.keys(employee).forEach((key) => {
  //   formData.append(key, employee[key]);
  // });

  const formData = new FormData();
formData.append("name", employee.name);
formData.append("email", employee.email);
formData.append("password", employee.password);
formData.append("position", employee.position);
formData.append("department", employee.department);
formData.append("salary", employee.salary);
formData.append("address", employee.address);
formData.append("employee_Image", employee.employee_Image); // ✅ key name must match multer field
formData.append("employment_status", employee.employment_status);
formData.append("employment_date", employee.employment_date);
formData.append("department_id", employee.department_id);


  await axios
    .post(`${API_BASE_URL}/admin/add_employee`, formData, {
      // headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    })
    .then((result) => {
      if (result.data.Status) {
        alert(result.data.Status);
        navigate("/dashboard/employee");
      } else {
        alert(result.data.Error);
      }
    })
    .catch((err) => console.log(err));
};

  return (
    <div>
      <h2> Add_Employee List</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="inputName">
            {" "}
            Name
            <input
              type="text"
              placeholder="Enter Employee Name Here"
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
        <br />
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="inputPassword4">
            Assigned_Password:
            <input
              type="password"
              placeholder="Enter Employee password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
              id="inputPassword4"
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
          <label htmlFor="inputPosition">
            Position/Rank:
            <input
              type="text"
              placeholder="Enter Employee Position/Rank"
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
          <label htmlFor="inputGroupFile01">
            {" "}
            Select Image:
            <input
              type="file"
              onChange={(e) =>
                setEmployee({ ...employee, employee_Image: e.target.files[0] })
              }
              id="inputGroupFile01"
              // name="employee_Image"
              className="form-control"
              style={{ formControl: "file", width: "100%", rounded: "50%" }}
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
                setEmployee({
                  ...employee,
                  department_id: e.target.value || 2, // Default to 2 for dev case
                })
              }
              style={{ formControl: "select", width: "100%", rounded: "50%" }}
            >
              <option value="">Choose...</option>
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
          Submit Employee
        </button>
      </form>
    </div>
  );
};

export default Add_Employee;
