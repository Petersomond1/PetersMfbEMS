import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../components.auth/employeeLogin.css";

const Add_Admin = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // Default role
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const imageUrl = `${process.env.REACT_APP_IMAGE_BASE_URL}/image.jpg`;
//background-image: url('https://petersemployeemgmtsystem-s3.s3.amazonaws.com/bg.jpg');
//background-image: url('https://dd8du22h6ze2n.cloudfront.net/bg.jpg');


const handleSubmit = async (e) => {
  e.preventDefault();
  await axios
  .post(`${API_BASE_URL}/auth/add_admin`, admin)
    .then((result) => {
      if (result.data.Status) {
        alert("Admin added successfully");
        navigate("/dashboard");
      } else {
        setError(result.data.Error);
      }
    })
    .catch((err) => console.log(err));
};


  return (
    <div>
      <h2>Add Admin</h2>
      {error && <div className="button-danger-display">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "3px" }}>
          <label htmlFor="inputName">
            Name
            <input
              type="text"
              placeholder="Enter Admin Name Here"
              onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
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
              placeholder="Enter Admin Email"
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
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
            Password
            <input
              type="password"
              placeholder="Enter Admin Password"
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
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
        <button type="submit" style={{ color: "green" }}>
          Submit Admin
        </button>
      </form>
    </div>
  );
};

export default Add_Admin;