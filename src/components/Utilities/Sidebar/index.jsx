import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import {FiUsers} from "react-icons/fi";
import {FaLaptopCode, FaUsers} from "react-icons/fa";


const Sidebar = () => {

  const [active, setActive] = useState(null);

  const location = useLocation();


  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <div className="container sidebar">
      <ul className="links">
        <Link to="/">
          <li className={`d-flex align-items-center ${active === '/' && 'active'}`}>
            <RxDashboard size={25} /> &nbsp; <span className="d-none d-md-inline"> Dashboard</span>
          </li>
        </Link>
        <Link to="/department">
          <li className={`d-flex align-items-center ${active === '/department' && 'active'}`}>
            {" "}
            <HiOutlineBuildingOffice2 size={25} /> &nbsp;{" "}
            <span className="d-none d-md-inline">Department</span>
          </li>
        </Link>
        <Link to="/roles">
          <li className={`d-flex align-items-center ${active === '/roles' && 'active'}`}><FiUsers size={25} /> &nbsp;{" "}
            <span className="d-none d-md-inline">Roles</span></li>
        </Link>
   
        <Link to="/users">
          <li className={`d-flex align-items-center ${active === '/users' && 'active'}`}><FaUsers size={25} />&nbsp;{" "}
            <span className="d-none d-md-inline">Users</span></li>
        </Link>
        <Link to="/technology">
          <li className={`d-flex align-items-center ${active === '/technology' && 'active'}`}><FaLaptopCode size={25} />&nbsp;{" "}
            <span className="d-none d-md-inline">Technology</span></li>
        </Link>

      </ul>
    </div>
  );
};

export default Sidebar;
