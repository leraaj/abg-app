import React, { useState } from "react";
import "./login.css";
import loginHovered from "../../assets/icons/login.svg";
import login from "../../assets/icons/loginLight.svg";
import Button from "../../components/button/Button";
import brand from "../../assets/brand/brand.png";
import useLogin from "../../hooks/useLogin";
import { useAuthContext } from "../../hooks/useAuthContext";
import useLogout from "../../hooks/useLogout";

const Login = () => {
  const { handleLogin, isLoading: loginLoading } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Invalid username/password");
      return console.error(error);
    }

    await handleLogin({
      username: username,
      password: password,
    }); //Updates authentication state(sa redux) if login is successful.
  };

  return (
    <div className="login-container d-flex justify-centered align-centered">
      <div className="login-card d-flex">
        <div className="login-pane col-auto d-flex justify-centered align-centered">
          <img src={brand} className="brand-image" />
        </div>
        <form className="login-pane form-group col " onSubmit={onSubmit}>
          <div className="input-group">
            <span className="input-label">Username</span>
            <input
              type="text"
              className="form-control col"
              onChange={handleUsername}
            />
          </div>
          <div className="input-group">
            <span className="input-label">Password</span>
            <input
              type="password"
              className="form-control col"
              onChange={handlePassword}
            />
          </div>
          <div className="d-flex justify-right mt-1 gap-1">
            <Button
              type={"submit"}
              label={loginLoading ? "Loading" : "Login"}
              btnStyle={"primary"}
              disable={loginLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
