import React from 'react'
import { Card, Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../../assests/img/WebvilleeLogo.png";
import greytHRLogo from "../../assests/img/greytip_logo.svg";
import { Link } from 'react-router-dom';
import Footer from '../Footer';

const Home = (props) => {
  return (
    <>
    <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src={logo}
              width="50"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            &nbsp; Webvillee Portal
          </Navbar.Brand>
          <div><Link to={"/"} onClick={props.signout} className='text-decoration-none text-black'>Logout</Link></div>
        </Container>
      </Navbar>
    <div className='container center-div'>
        <div className="row">
            <div className="col-6">
                <Card onClick={() => window.open("https://kra.webvilleedemo.xyz/", "_blank")} style={{color:"#FF5858", cursor:"pointer"}}>
                    <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
                        <h4 >KRA</h4>
                        <p>(Key Responsibility Areas)</p>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-6">
            <Card onClick={() => window.open("http://interviewtool.webvilleedemo.xyz/", "_blank")} style={{color:"#FF5858", cursor:"pointer"}}>
                    <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
                        <h4 >Interview Tool</h4>
                    </Card.Body>
                </Card>
            </div>
        </div>
        <div className="row">
            <div className="col-6">
            <Card style={{color:"#FF5858", cursor:"pointer"}}>
                    <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
                        <h4 >LMS</h4>
                        <p>(Learning Management System)</p>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-6">
            <Card onClick={() => window.open("https://webvillee-technology.greythr.com/", "_blank")} style={{cursor:"pointer"}}>
                    <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
                        <img src={greytHRLogo} alt={"gretHR"} />
                    </Card.Body>
                </Card>
            </div>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Home;