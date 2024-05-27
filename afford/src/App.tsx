import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./SingIn";
import SignUp from "./SignUp";
import LandingPage from "./LandingPage";
import Dashboards from "./main/Dashboards";
import ActiveUsers from "./main/Components.tsx/ActiveUsers";
import Admin from "./main/Components.tsx/Admin";

const App = () => {
  return (
    <div className="h-full  flex  justify-center items-center">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/active" element={<ActiveUsers />} /> */}
        <Route element={<Dashboards />}>
          <Route path="/user" element={<ActiveUsers />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
