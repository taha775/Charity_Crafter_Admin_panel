import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/Firebase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Components/Login.css"; // Import your CSS file
import logo from '../Assets/Pictures/logo.PNG'

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassowrd] = useState("");
  const [admindata, setAdminData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "admin"));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setAdminData(data);
        });
      } catch (e) {
        console.log("Error fetching admin data:", e);
      }
    };
    getAdmin();
  }, []);

  const handleSignup = () => {
    if (email === admindata.email && password === admindata.password) {
      toast.success("Login Successful")
      console.log("admin verify ");
      navigate("/Dashboard");
    } else if (!email || !password) {
      toast.error("Email and password should not be empty");
    } else {
      toast.error("Admin not registered")
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="" />
      <h3 className="login-title">Admin Login</h3>
      <input
        type="email"
        name="email"
        value={email}
        id="email"
        placeholder="Enter Email"
        onChange={(e) => setemail(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        placeholder="Enter Password"
        onChange={(e) => setpassowrd(e.target.value)}
        className="input-field"
      />
      <button onClick={handleSignup} className="login-button ">
        Login
      </button>
      <div className="error-message">
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
