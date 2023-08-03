import React from 'react'
import { Card, Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../../assests/img/WebvilleeLogo.png";
import greytHRLogo from "../../assests/img/greytip_logo.svg";
import { Link } from 'react-router-dom';
import Footer from '../Footer';

import kraLogo from "../../assests/img/images.png";
import interviewLogo from "../../assests/img/interview.png";
import lmsLogo from "../../assests/img/lms.png";

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
                        {/* <h4 >KRA</h4>
                        <p>(Key Responsibility Areas)</p> */}
                        <img width={180} height={120} src={kraLogo} alt={"KRA"} />
                    </Card.Body>
                </Card>
            </div>
            <div className="col-6">
            <Card onClick={() => window.open("http://interviewtool.webvilleedemo.xyz/", "_blank")} style={{color:"#FF5858", cursor:"pointer"}}>
                    <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
                        {/* <h4 >Interview Tool</h4> */}
                        <img width={200} height={120} src={interviewLogo} alt={"Interview Tool"} />
                    </Card.Body>
                </Card>
            </div>
        </div>
        <div className="row">
            <div className="col-6">
            <Card style={{color:"#FF5858", cursor:"pointer"}}>
                    <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
                        {/* <h4 >LMS</h4>
                        <p>(Learning Management System)</p> */}
                        <img width={180} height={100} src={lmsLogo} alt={"LMS"} />
                    </Card.Body>
                </Card>
            </div>
            <div className="col-6">
            <Card onClick={() => window.open("https://webvillee-technology.greythr.com/", "_blank")} style={{cursor:"pointer"}}>
                    <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
                        <img width={180} height={100} src={greytHRLogo} alt={"gretHR"} />
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