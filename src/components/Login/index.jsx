import React, { useEffect } from 'react';
import logo from "../../assets/img/WebvilleeLogo.png";
import GoogleButton from "react-google-button";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from 'react-router';
import axios from 'axios';
import {  useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

const Login = (props) => {

  const [ user, setUser ] = useState(null);
  const [ profile, setProfile ] = useState(null);

  const navigate = useNavigate();

  const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

  useEffect(() => {

    if(user && profile){
      console.log(profile.email);

      localStorage.setItem('user', profile.email);

      navigate("/", {replace: true});
      
    }


    //eslint-disable-next-line
  }, [ user, profile ]);


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
              onClick={login}
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