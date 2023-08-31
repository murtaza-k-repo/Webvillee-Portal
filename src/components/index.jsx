import React from "react";

import { Outlet } from "react-router";
import Navbar from "./Utilities/Navbar";
import Sidebar from "./Utilities/Sidebar";
import Footer from "./Utilities/Footer";

const Root = (props) => {
  return (
    <>
      <Navbar {...props}/>

      <div className="">
        <div className="row w-100">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <Outlet />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Root;
