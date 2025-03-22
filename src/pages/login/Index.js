import React, { useState } from "react";
import "./login.css";
import loginHovered from "../../assets/icons/login.svg";
import login from "../../assets/icons/loginLight.svg";
import Button from "../../components/button/Button";
import brand from "../../assets/brand/brand.png";
import useLogin from "../../hooks/auth/useLogin";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const { handleLogin, isLoading: loginLoading } = useLogin();
  const [username, setUsername] = useState("Nurse");
  const [password, setPassword] = useState("123123");
  const [error, setError] = useState(null);
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
    });
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card d-flex">
        <div className="login-pane col-auto d-flex justify-content-center align-items-center ">
          <img src={brand} className="brand-image" />
        </div>
        <form className="login-pane form-group col " onSubmit={onSubmit}>
          <div className="input-group">
            <span className="input-label">Username</span>
            <input
              type="text"
              className="form-control col"
              defaultValue={username}
              onChange={handleUsername}
            />
          </div>
          <div className="input-group">
            <span className="input-label">Password</span>
            <input
              type="password"
              className="form-control col"
              defaultValue={password}
              onChange={handlePassword}
            />
          </div>
          <div className="d-flex justify-right mt-1 gap-1">
            <Button
              type={"button"}
              label={"Back to Homepage"}
              btnStyle={"secondary-outline"}
              onClick={() => navigate("/")}
            />
            <Button
              type={"submit"}
              label={loginLoading ? "Loading" : "Login"}
              btnStyle={"primary"}
              disable={loginLoading}
            />
            <Button
              type={"button"}
              label={"Current User"}
              btnStyle={"primary"}
              onClick={currentUser}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
