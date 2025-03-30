import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSendCode = () => {
    axios
      .post(`${API_BASE_URL}/employee/forgot_password`, { email })
      .then((response) => {
      if (response.data.success) {
        setStep(2);
      } else {
        setError(response.data.message);
      }
      })
      .catch(() => setError("Error sending code"));
  };

  const handleVerifyCode = () => {
    axios
      .post(`${API_BASE_URL}/employee/reset_password`, { email, code, newPassword })
      .then((response) => {
      if (response.data.success) {
        alert("Password reset successfully");
        navigate("/");
      } else {
        setError(response.data.message);
      }
      })
      .catch(() => setError("Error resetting password"));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {step === 1 ? (
        <div>
          <h3>Forgot Password</h3>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <button onClick={handleSendCode}>Send Code</button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      ) : (
        <div>
          <h3>Reset Password</h3>
          <input
            type="text"
            placeholder="Enter the code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <button onClick={handleVerifyCode}>Reset Password</button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;