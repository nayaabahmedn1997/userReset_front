import React, { useState } from "react";

import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axiosInstance.post("/forgot-password", { email });
      setMessage(res.data.message);
      localStorage.setItem("reset-token", res.data.resetToken);
      navigate(`/reset-password/${res.data.resetToken}`);
    } catch (err) {
      localStorage.removeItem("/reset-token");
      setMessage(err.response?.data?.message || "Something went wrong");
    }
    finally{
      setLoading(false);
    }
  };

  return (
   

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header text-center">
                <h4>Forgot Password</h4>
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
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"

                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="text-center">



                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={loading}
                    >
                      Send Reset Link
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

export default ForgotPassword;
