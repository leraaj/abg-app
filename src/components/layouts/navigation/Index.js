import "./navbar.css";
import logo from "../../../assets/brand/brand.png";
import notifLight from "../../../assets/icons/notification-line.png";
import logoutIcon from "../../../assets/icons/logout.svg";
import Button from "../../button/Button";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useLogout from "../../../hooks/useLogout";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuthContext();
  const { handleLogout, isLoading } = useLogout();
  return (
    <div className="navigation-bar">
      <div className="left">
        <span className="brand">
          <img src={logo} alt="logo" height={55} />
        </span>
        <span className="brand-name">ABG requests</span>
      </div>
      <div className="d-flex justify-centered align-items-centered gap-1">
        <Link to={"/request"} className="nav-link">
          Request
        </Link>
        <Link to={"/login"} className="nav-link">
          Login
        </Link>
      </div>
      <div className="right">
        <Button btnStyle={"notif"} icon={notifLight} />
        {user && (
          <>
            <span>{user?.user[0].username}</span>
            <Button
              type={"button"}
              icon={isLoading ? "Loading" : logoutIcon}
              btnStyle={"notif"}
              disable={isLoading}
              onClick={handleLogout}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
