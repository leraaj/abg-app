import React from "react";
import "./login.css";
import loginHovered from "../../assets/icons/login.svg";
import login from "../../assets/icons/loginLight.svg";
import Button from "../../components/button/Button";
const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="brand-container">
          <img src="" className="brand" />
        </div>
        <div className="login-forms">
          <h2 className="login-label">Let’s get started</h2>
          <div className="form-input">
            <div className="input-label">
              <span className="label">Username</span>
            </div>
            <input type="text" className="form-input" />
          </div>
          <div className="form-input">
            <div className="input-label">
              <span className="label">Password</span>
            </div>
            <input type="password" className="form-input" />
          </div>
          <Button label={"Login"} icon={login} iconHovered={loginHovered} />
        </div>
      </div>
    </div>
  );
};

export default Login;
