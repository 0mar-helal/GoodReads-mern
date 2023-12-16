import React from "react";
import SideBar from "./Dashboard/SideBar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <SideBar />
      {children}
    </div>
  );
};

export default DashboardLayout;
