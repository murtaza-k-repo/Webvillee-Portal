import React from 'react';
import logo from "../../assests/img/WebvilleeLogo.png";
import GoogleButton from "react-google-button";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from 'react-router';

const Login = (props) => {

  const navigate = useNavigate();

  return (
    <div className="App center-div">
      <div
        className="d-flex text-center  flex-column"
        style={{ color: "white" }}
      >
        <h3 className="mb-4">
          {/* <b>Hey! Welcome to Webvillee Portal</b> */}
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Hey! Welcome to Webvillee Portal!",
              2000, // wait 1s before replacing "Mice" with "Hamsters"
              "Get access to all the portals by single login...",
              2000
            ]}
            wrapper="span"
            speed={50}
            style={{ display: "inline-block" }}
            repeat={Infinity}
          />
        </h3>
      </div>
      <div
        className="container  bg-white p-5"
        style={{ width: "500px", borderRadius: "15px" }}
      >
        <div className="row align-items-center">
          <div className="col-4">
            <div className="me-3">
              <img width={100} height={60} src={logo} alt="logo" />
            </div>
          </div>

          <div className="col-8">
            <GoogleButton
              onClick={() => {
                props.signin();
                navigate("/home");
              }}
              className="google-button"
              style={{ margin: "auto", borderRadius: "15px" }}
              type="light"
              label="Login to the Portal"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login