import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axiosInstance";

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password === confirmPassword)
    {
    setLoading(true);
    setMessage("");
    try {

      const res = await axiosInstance.post(`/reset-password/${token}`, { password });
      setMessage(res.data.message);
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
    finally{
        setLoading(false);
    }
    }
    else
    {
        setMessage("Both passwords are not matching")
    }
  };

  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header text-center">
                <h4>Reset Password</h4>
              </div>
              <div className="card-body">
                {message && (
                  <div
                    className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"}`}
                    role="alert"
                  >
                    {message}
                  </div>
                )}
                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                     New Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="password"
                      name="password"

                      placeholder="Enter your new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirm-password" className="form-label">
                     Confirm Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="confirm-password"
                      name="confirmPassword"

                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="text-center">



                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={loading}
                    >
                     Reset Password
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ResetPassword;
