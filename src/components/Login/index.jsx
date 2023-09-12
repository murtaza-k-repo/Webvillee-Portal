import React, { useEffect } from "react";
import logo from "../../assets/img/WebvilleeLogo.png";
import GoogleButton from "react-google-button";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const getAuthToken = async (email) => {
    try {
      setIsLoading(true);
      let response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/all/login`,
        { email }
      );
      if (response.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: response?.data?.data?.token,
            profile: response.data?.data?.payload,
          })
        );

        setIsLoading(false);

        navigate("/", { replace: true });
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (user && profile) {
      console.log(profile);

      getAuthToken(profile.email);
    }

    //eslint-disable-next-line
  }, [user, profile]);

  return (
    <div className="App center-div">
      <ToastContainer />
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
              2000,
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
              disabled={isLoading}
              onClick={login}
              className="google-button"
              style={{ margin: "auto", borderRadius: "15px" }}
              type="light"
              label={
                isLoading ? (
                  <p className="d-flex justify-content-center align-items-center">
                    <span>Login to the portal</span> &nbsp;&nbsp;
                    <span
                      className="spinner-border text-secondary"
                      role="status"
                    ></span>
                  </p>
                ) : (
                  "Login to the Portal"
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
