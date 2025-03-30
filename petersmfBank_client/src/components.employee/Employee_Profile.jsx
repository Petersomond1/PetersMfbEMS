import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CiBank } from 'react-icons/ci';
import { FcDepartment } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import '../App.css'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use environment variable
const REACT_APP_IMAGE_BASE_URL = import.meta.env.VITE_REACT_APP_IMAGE_BASE_URL;

const Employee_Profile = () => {
    axios.defaults.withCredentials = true;
    const [employee, setEmployee] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/employee/employee_profile/${id}`)
            .then(result => {
                if (result.data.employee[0] !== undefined) {
                    setEmployee(result.data.employee[0]);
                    console.log('Employee image:', result.data.employee[0].image);
                    console.log('Image URL:', `${API_BASE_URL}/uploads/${result.data.employee[0].image}`);
                } else {
                    console.log('Employee image is undefined');
                    setEmployee({});
                }
            })
            .catch(err => {
                console.log(err);
                setEmployee({});
            });
    }, [id]);

    const handleLogout = () => {
        axios.get(`${API_BASE_URL}/employee/logout`)
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid");
                    navigate("/", { replace: true });
                    history.scrollRestoration = 'manual';
                }
            }).catch(err => console.log(err));
    };

    return (
        <div style={{ flexWrap: 'nowrap' }} className="dashboard-container-3">
            <div className="navbar-1">
                <span>
                    <CiBank />
                    Peters MicroFinance Bank Plc
                </span>
                <br />
                <span>
                    <button onClick={handleLogout}>logout</button>
                </span>
            </div>
            <div className="dashboard-container-profile">
                <div>
                    <span>
                        <FcDepartment /> <strong>Company Policy</strong>
                    </span>
                    <li><Link to="/updateemployee">Employee Leave</Link></li>
                    <li><Link to="/updateemployee">Employee Attendance</Link></li>
                    <li><Link to="/updateemployee">Employee Performance</Link></li>
                    <li><Link to="/updateemployee">Employee Training</Link></li>
                    <li><Link to="/updateemployee">Employee Recruitment</Link></li>
                    <li><Link to="/updateemployee">Employee Promotion</Link></li>
                    <li><Link to="/updateemployee">Employee Termination</Link></li>
                    <li><Link to="/updateemployee">Employee Retirement</Link></li>
                    <li><Link to="/updateemployee">Employee Transfer</Link></li>
                    <li><Link to="/updateemployee">Employee Resignation</Link></li>
                    <li><Link to="/updateemployee">Employee Insurance & Benefits</Link></li>
                    <li><Link to="/updateemployee">Employee Payroll</Link></li>
                </div>
                <div className="profile-container">
                    <h1>Employee Profile</h1>
                    <div className="profile-info">
                    <img 
    src={employee.image ? `${REACT_APP_IMAGE_BASE_URL}/${employee.image}` : 'https://via.placeholder.com/150'}
    alt="Employee Image"
    style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover' }} 
/>
                        <div className="info-field">
                            <span className="field-name">Employee Name:</span>
                            <span className="field-value">{employee.name}</span>
                        </div>
                        <div className="info-field">
                            <span className="field-name">Employee ID:</span>
                            <span className="field-value">100{employee.id}0</span>
                        </div>
                        <div className="info-field">
                            <span className="field-name">Employee Email:</span>
                            <span className="field-value">{employee.email}</span>
                        </div>
                        <div className="info-field">
                            <span className="field-name">Employee Designation:</span>
                            <span className="field-value">{employee.position}</span>
                        </div>
                        <div className="info-field">
                            <span className="field-name">Employee Department:</span>
                            <span className="field-value">{employee.department}</span>
                        </div>
                        <div className="info-field">
                            <span className="field-name">Employee Salary/Rate:</span>
                            <span className="field-value">${employee.salary}</span>
                        </div>
                        <div className="info-field">
                            <span className="field-name">Employee Address:</span>
                            <span className="field-value">{employee.address}</span>
                        </div>
                        <div className="info-field">
                            <span className="field-name">Employee Status:</span>
                            <span className="field-value">{employee.status}</span>
                        </div>
                        <div className="info-field">
                            <span className="field-name">Employment Date:</span>
                            <span className="field-value">{employee.employment_date}</span>
                        </div>
                        <div className="info-field">
                            <span className="field-name">Department Unit ID:</span>
                            <span className="field-value">{employee.department_id}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employee_Profile;
