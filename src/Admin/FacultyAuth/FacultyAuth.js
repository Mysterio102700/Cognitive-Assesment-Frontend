import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import brain from "../../Assests/images/login.png";
import { login, register } from "../../Api/login";

const FacultyAuth = () => {
  const [showSignup, setshowSignup] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [pinNo, setpinNo] = useState("");
  const [email, setemail] = useState("");
  const [signupSuccess, setsignupSuccess] = useState(false);
  const [authResponse, setauthResponse] = useState("");
  const [hidepass, sethidepass] = useState(false);

  const clearState = () => {
    setusername("");
    setpassword("");
    setemail("");
    setpinNo("");
    setshowSignup(false);
    setsignupSuccess(false);
    setauthResponse("");
  };

  const togglehandler = () => {
    clearState();
    setshowSignup(!showSignup);
  };

  const hidepassword = () => {
    sethidepass(!hidepass);
  };

  const navigate = useNavigate();

  const loginHandler = async () => {
    const user = { username, password };

    if (!username || !password) {
      setauthResponse("Username and Password  are required !!");
      setsignupSuccess(false);
      return;
    }

    try {
      const response = await login(user);
      if (response.status === 200) {
        setsignupSuccess(true);
        navigate("/Dashboard");
        console.log(response);
        const usersName = response.data.user.username;
        console.log(usersName);
        localStorage.setItem("username", usersName);
      } else {
        setauthResponse(response);
      }
    } catch (error) {
      console.log(error);
      setauthResponse(error);
    }
  };

  const registerHandler = async () => {
    const user = { username, email, pinNo, password };

    if (!username || !email || !pinNo || !password) {
      setauthResponse("Username, Email, Password are required !!");
      setsignupSuccess(false);
      return;
    }

    try {
      const response = await register(user);
      console.log(response);
      setauthResponse(response);
      clearState();
      setshowSignup(false);
    } catch (error) {
      console.log(error);
    }
  };

  const renderComponent = () => {
    return (
      <>
        <section
          style={{
            backgroundColor: "#D0C9C2",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <div className="container ">
            <div className="blob">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 400 914"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M457.137 0C683.593 0 800 193.579 800 426.963C800 644.324 664.045 915 453.137 915C211.424 915 0 676.069 0 426.963C0 163.759 201.745 0 457.137 0Z"
                  fill="#E8BF72"
                />
              </svg>
            </div>
            <div className="star-blob">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 502 530"
                fill="none"
              >
                <path
                  d="M-14.2485 520.857L-282.871 408.513L-47.0788 288.935L-15.6667 0.759404L187.007 199.813L435.448 127.085L330.556 363.749L501.109 590.93L211.309 584.02L61.6465 801.96L-14.2485 520.857Z"
                  fill="#D9A0B3"
                  stroke="#D9A0B3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="row shadow-lg">
              <div className="col-8 login-img">
                <img src={brain} alt="" />
              </div>
              <div className="col-lg-4 col-md-7 mx-auto d-flex align-items-center">
                {" "}
                <div className="login-wrapper">
                  <h2 className="text-center">
                    {showSignup ? "Sign Up" : "Sign In"}
                  </h2>
                  {showSignup && (
                    <>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control border border-dark"
                          placeholder="Faculty Email"
                          autoComplete="off"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control border border-dark"
                          placeholder="PinNo"
                          autoComplete="off"
                          value={pinNo}
                          onChange={(e) => setpinNo(e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control border border-dark"
                      placeholder="Faculty Name"
                      autoFocus
                      autoComplete="off"
                      value={username}
                      onChange={(e) => setusername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type={hidepass ? "text" : "password"}
                      className="form-control border border-dark"
                      placeholder="Password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                    <i
                      className={
                        hidepass
                          ? "fa-regular fa-eye-slash"
                          : "fa-regular fa-eye"
                      }
                      onClick={hidepassword}
                    ></i>
                  </div>
                  <div className="text-center">
                    <button
                      style={{ width: "30%" }}
                      type="button"
                      className="btn  btn-dark form-control"
                      onClick={showSignup ? registerHandler : loginHandler}
                    >
                      {showSignup ? "Signup" : "Login"}
                    </button>
                  </div>

                  <div className="auth-msg">
                    {showSignup
                      ? "Already have an account !!"
                      : "Don't have an account ?"}
                    <button className="btn btn-link " onClick={togglehandler}>
                      {showSignup ? "Login" : "Signup"}
                    </button>
                  </div>
                  {
                    <div
                      className={
                        signupSuccess
                          ? "auth-response text-info text-center"
                          : "auth-response text-danger text-center"
                      }
                    >
                      {authResponse}
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return renderComponent();
};

export default FacultyAuth;