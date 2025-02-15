import React, { useState } from "react";
import "./login.css";
import loginHovered from "../../assets/icons/login.svg";
import login from "../../assets/icons/loginLight.svg";
import Button from "../../components/button/Button";
import brand from "../../assets/brand/brand.png";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  return (
    <div className="login-container position-centered">
      <div className="login-card">
        <div className="brand-container position-centered">
          <img src={brand} className="brand" />
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
          <div className="mt-1 position-right">
            <Button
              label={"Login"}
              icon={login}
              iconHovered={loginHovered}
              onClick={handleLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
