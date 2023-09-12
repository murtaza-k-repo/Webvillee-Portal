import React from "react";
import { Card } from "react-bootstrap";

import greytHRLogo from "../../assets/img/greytip_logo.svg";

import kraLogo from "../../assets/img/images.png";
import interviewLogo from "../../assets/img/interview.png";
import lmsLogo from "../../assets/img/lms.png";
import { encrypt } from "../Protected/Encrypt";


const Home = (props) => {

  const encoded = encrypt(localStorage.getItem("user"));

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6">
            <Card
              onClick={() =>
                window.open(`https://tired-wings-read.loca.lt/home?redirect=${encoded}`, "_blank")
              }
              style={{ color: "#FF5858", cursor: "pointer" }}
            >
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <img
                  className="d-none d-md-block"
                  width={180}
                  height={120}
                  src={kraLogo}
                  alt={"KRA"}
                />
                <h4 className="text-center fw-bold d-md-none">KRA</h4>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6">
            <Card
              onClick={() =>
                window.open(`http://localhost:3001/superadmin?redirect=${encoded}`, "_blank")
              }
              style={{ color: "#FF5858", cursor: "pointer" }}
            >
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <img
                  className="d-none d-md-block"
                  width={200}
                  height={120}
                  src={interviewLogo}
                  alt={"Interview Tool"}
                />
                <h4 className="text-center fw-bold d-md-none">
                  Interview Tool
                </h4>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Card style={{ color: "#FF5858", cursor: "pointer" }}>
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <img
                  className="d-none d-md-block"
                  width={180}
                  height={100}
                  src={lmsLogo}
                  alt={"LMS"}
                />
                <h4 className="text-center fw-bold d-md-none">LMS</h4>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6">
            <Card
              onClick={() =>
                window.open(
                  "https://webvillee-technology.greythr.com/",
                  "_blank"
                )
              }
              style={{ color: "#FF5858", cursor: "pointer" }}
            >
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <img
                  className="d-none d-md-block"
                  width={180}
                  height={100}
                  src={greytHRLogo}
                  alt={"gretHR"}
                />
                <h4 className="text-center fw-bold d-md-none">gretHR</h4>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
