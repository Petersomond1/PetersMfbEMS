import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Department.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Department = () => {
    const [department, setDepartment] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/admin/department`)
        .then(result => {
            if (result.data.Status) {
                setDepartment(result.data.department);
            } else {
                alert(result.data.Error);
            }
        }).catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h3>Department List</h3>
            <button>
                <strong>
                    <Link to="/dashboard/add_department" style={{ color: "green" }}>
                        Add Department
                    </Link>
                </strong>
            </button>
            <table className="table" style={{ marginTop: "3px" }}>
                <thead>
                    <tr>
                        <th>Department ID</th>
                        <th>Department Name</th>
                        <th>Department Head</th>
                        <th>Department Description</th>
                        <th>Department Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {department.map((dept) => (
                        <tr key={dept.id}>
                            <td>{dept.id}</td>
                            <td>{dept.name}</td>
                            <td>{dept.head}</td>
                            <td>{dept.description}</td>
                            <td>{dept.status}</td>
                            <td>
                                <button>View</button>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Department;
