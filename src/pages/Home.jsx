import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const fetchUserData = async()=>{
      try {
        setLoading(true);
        setMessage("");
        const token = localStorage.getItem("userToken"); 
        const response = await axiosInstance.get("/user-data",{
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the header
          },
        });
        console.log(response.data)
        setMessage(response.data.message); // Display success message
        setFormData(response.data.user);
      } catch (error) {
        setLoading(false);
        console.log(error.message)
      }
    }
    const logout = (e) =>{
      e.preventDefault();
      localStorage.removeItem("userToken");
      navigate("/login");
    }
    useEffect(()=>{
      const token = localStorage.getItem("userToken");
      if(!token)
      {
        navigate("/login");
      }
      else
      {
      fetchUserData();
      }
    }, []);

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-header text-center">
            <h4>User Data</h4>
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
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
        
                  value={formData.email}
                  
                />
              </div>
              <div className="text-center">
                <button
                  
                  className="btn btn-primary w-100"
                  onClick={(event)=>logout(event)}
                >
                  Logout 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Home