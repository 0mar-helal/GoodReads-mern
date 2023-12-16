import React from "react";
import Navbar from "./Navbar";
import MyFooter from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <MyFooter />
    </>
  );
};

export default Layout;
