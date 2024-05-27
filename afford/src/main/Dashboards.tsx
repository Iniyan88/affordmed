import React from "react";
import { Outlet } from "react-router-dom";

const Dashboards = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Dashboards;
