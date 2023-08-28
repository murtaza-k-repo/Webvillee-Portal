import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import {FiUsers} from "react-icons/fi";
import {FaUsers} from "react-icons/fa";
// import {LiaBookSolid} from "react-icons/lia"


const Sidebar = () => {
  return (
    <div className="container sidebar d-none d-md-block">
      <ul className="links">
        <Link to="/">
          <li className="d-flex align-items-center text-center">
            <RxDashboard size={20} /> &nbsp; <span> Dashboard</span>
          </li>
        </Link>
        <Link to="/department">
          <li className="d-flex align-items-center text-center">
            {" "}
            <HiOutlineBuildingOffice2 size={20} /> &nbsp;{" "}
            <span> Manage Department</span>
          </li>
        </Link>
        <Link to="/roles">
          <li className="d-flex align-items-center text-center"><FiUsers size={20} /> &nbsp;{" "}
            <span>Manage Roles</span></li>
        </Link>
        {/* <Link to="/courses">
          <li className="d-flex align-items-center text-center"><LiaBookSolid size={20} /> &nbsp;{" "}
            <span>Manage Courses</span></li>
        </Link> */}
        <Link to="/users">
          <li className="d-flex align-items-center text-center"><FaUsers size={20} />&nbsp;{" "}
            <span>Manage Users</span></li>
        </Link>
        {/* <Link to="/settings">
          <li className="d-flex align-items-center text-center"><FiSettings size={20} />&nbsp;{" "}
            <span>Settings</span></li>
        </Link> */}
      </ul>
    </div>
  );
};

export default Sidebar;
