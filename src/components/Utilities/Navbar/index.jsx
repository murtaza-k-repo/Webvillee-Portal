import React from 'react'
import { Container, Navbar as Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../../../assets/img/WebvilleeLogo.png";

const Navbar = (props) => {

  // const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
  }

  return (
    <Nav className="bg-body-tertiary d-flex justify-content-between">

          <Nav.Brand>
            <img
              alt=""
              src={logo}
              width="50"
              height="30"
              className="d-inline-block align-top ms-3"
            />{' '}
            &nbsp; Webvillee Portal
          </Nav.Brand>
          <div><Link to={"/login"} onClick={handleLogout} className='text-decoration-none text-black me-3'>Logout</Link></div>

      </Nav>
  )
}

export default Navbar;