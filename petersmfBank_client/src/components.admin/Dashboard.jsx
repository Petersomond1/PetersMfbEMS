import React from "react";
import { Link, Outlet } from "react-router-dom";
import { CiBank } from "react-icons/ci";
import { FcDepartment } from "react-icons/fc";
import { IoPeople } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleLogout = () => {
        axios.get(`${API_BASE_URL}/auth/logout`)
        .then(result => {
            if (result.data.Status) {
                localStorage.removeItem("valid");
                navigate("/", { replace: true });
            }
        }).catch(err => console.log(err));
    };

    return (
        <div className="dashboard-container-2">
            <div className="dashboard-container-3">
                <div className="navbar-1">
                    <span>
                        <CiBank />
                        Peters MicroFinance Bank Plc
                    </span>
                    <br />
                    <span>
                        <FcDepartment /> <strong>HR Admin's Dashboard</strong>
                    </span>
                    <span>
                        <i className="fa fa-bars"></i>
                    </span>
                </div>

                <div className="dashboard-container-4">
                    <div className="dashboard-container-5">
                        <Link to="/dashboard">
                            <span>HR Admin's Dashboard</span>
                        </Link>
                        <ul>
                            <li>
                                <Link to="/dashboard/employee">
                                    <IoPeople />
                                    Manage Employee
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/department">Company Department</Link>
                            </li>
                            <li onClick={handleLogout}>
                                <Link to="/logout">
                                    <BiLogOutCircle />
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="dashboard-main">
                        <Outlet />
                    </div>
                </div>

                <div className="footnavbar">
                    <footer>Footer</footer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
