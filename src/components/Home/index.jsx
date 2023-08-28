import React from 'react'
import { Card } from 'react-bootstrap';


import greytHRLogo from "../../assets/img/greytip_logo.svg";


import kraLogo from "../../assets/img/images.png";
import interviewLogo from "../../assets/img/interview.png";
import lmsLogo from "../../assets/img/lms.png";


const Home = (props) => {
  return (
    <>

    <div className='container'>
        <div className="row mt-5">
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
    
    </>
  )
}

export default Home;