import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../Components/Login";
import Dashboard from "../Components/Dashboard";
import Post from "../Components/Post";
import Terms from "../Components/Terms";
import Privacy from "../Components/Privacy";
import About from "../Components/About";

import Request from "../Components/Request";
import AllUser from "../Components/AllUser";
import Donation from "../Components/Donation";


const Navigation = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Signup />}>
          {" "}
        </Route> */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/post" element={<Post />}></Route>
        <Route path="/terms" element={<Terms />}></Route>
        <Route path="/privacy" element={<Privacy />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/request" element={<Request />}></Route>

        <Route path="/about" element={<About />}></Route>
        <Route path="/alluser" element={<AllUser />}></Route>
        <Route path="/donation" element={<Donation />}></Route>
      </Routes>
    </div>
  );
};

export default Navigation;
