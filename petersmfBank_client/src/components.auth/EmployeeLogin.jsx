import React, { useState } from "react";
import "./employeeLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TbLogin2 } from "react-icons/tb";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const login = async (email, password, role) => {
  try {
    console.log("Post payload:", { email, password, role });
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      { email, password, role },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
   
    console.error("Login error:", error);
    return { loginStatus: false, Error: "Login failed" };
  }
};

const EmployeeLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    role: "employee", // Default role
  });

  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(false); // State to manage active/inactive state
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const result = await login(values.email, values.password, values.role);
  
      if (result.loginStatus) {
        localStorage.setItem("valid", true);
        if (result.firstTime) {
          alert(
            "This is your first time logging in. Please change your password."
          );
        }
        navigate(
          result.role === "admin"
            ? "/dashboard"
            : `/employee_profile/${result.id}`
        );
      } else {
        setError(result.Error + "; Please try again");
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };
  return (
    <div className="loginDoor"
    >
      {!isActive ? (
        <button
          onClick={() => setIsActive(true)}
          style={{
            fontSize: "20px",
            color: "blue",
            padding: "10px 20px",
            borderRadius: "10px",
            border: "2px solid blue",
            cursor: "pointer",
          }}
        >
          Click to start login
        </button>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            borderRadius: "15px",
            height: "35%",
            width: "35%",
            border: "5px solid",
            justifyContent: "center",
          }}
          className="loginForm"
        >
          {error && <div className="button-danger-display">{error}</div>}

          <form
            style={{
              justifyContent: "center",
              display: "block",
              flexDirection: "column",
              marginTop: "-25px",
            }}
            onSubmit={handleSubmit}
          >
            <h3>
              <span>
                <TbLogin2 />
              </span>{" "}
              Login
            </h3>
            <div>
  <label htmlFor="email">
    <strong>Email:</strong>
    <input
      type="email"
      id="email" // Updated to match the label's "for" attribute
      name="email"
      autoComplete="off"
      placeholder="Enter Your Email Here"
      onChange={(e) => setValues({ ...values, email: e.target.value })}
      className="login_email_input"
      style={{
        formControl: "plaintext",
        width: "80%",
        margin: "5px",
      }}
    />
  </label>
</div>
<div>
  <label htmlFor="password">
    <strong>Password:</strong>
    <input
      id="password" // Updated to match the label's "for" attribute
      name="password"
      type="password"
      autoComplete="off"
      placeholder="Enter Your Password Here"
      onChange={(e) => setValues({ ...values, password: e.target.value })}
      className="login_password_input"
      style={{
        width: "80%",
        margin: "5px",
        formControl: "plaintext",
      }}
    />
  </label>
</div>
<div>
  <label htmlFor="role">
    <strong>Role:</strong>
    <select
      id="role" // Updated to match the label's "for" attribute
      name="role"
      onChange={(e) => setValues({ ...values, role: e.target.value })}
      value={values.role}
      style={{ width: "80%", margin: "5px" }}
    >
      <option value="employee">Employee</option>
      <option value="admin">Admin</option>
    </select>
  </label>
</div>
            <button
              type="submit"
              className="login_submit_btn"
              style={{
                fontSize: "20px",
                color: "blue",
                width: "50%",
                justifyContent: "center",
                marginLeft: "22%",
              }}
            >
              Log in
            </button>
            <div style={{ marginBottom: "1px" }}>
              <input type="checkbox" name="tick" id="tick" />
              <label htmlFor="remember" className="form-label">
                {" "}
                I agree to the terms & conditions of use of this site
              </label>
            </div>
          </form>
          <button
            onClick={() => navigate("/forgot_password")}
            style={{
              fontSize: "14px",
              color: "blue",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              marginTop: "10px",
            }}
          >
            Forgot Password?
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeLogin;