import "./navbar.css";
import logo from "../../../assets/brand/brand.png";
import notifLight from "../../../assets/icons/notification-line.png";
import logoutIcon from "../../../assets/icons/logout.svg";
import Button from "../../button/Button";
import { Link, useLocation } from "react-router-dom";
import { links } from "./links";
import { useEffect } from "react";
import dropdownIcon from "../../../assets/icons/caret-down-outline.svg";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import useLogout from "../../../hooks/auth/useLogout";
import useFetchUserPosition from "../../../hooks/auth/useFetchUserPosition";

const Navbar = () => {
  const location = useLocation();
  const { user, toggle, toggler } = useAuthContext();
  const { position } = useFetchUserPosition();
  const { handleLogout, isLoading } = useLogout();

  // Filter links based on user's position
  const privateLinks = links.filter((link) => {
    if (!link.isPrivate) return !user; // Hide non-private links when user is logged in
    return link.access.includes(position?.id);
  });

  return location.pathname == "/login" ? (
    <></>
  ) : (
    <div className="navigation-bar">
      <div className="left col-auto">
        <span className="brand">
          <img src={logo} alt="logo" height={55} />
        </span>
        <span className="brand-name">ABG</span>
      </div>
      <div
        className={`col d-flex justify-${
          !user ? "right" : "left"
        } align-items-centered gap-1 px-1`}>
        {privateLinks.map((link) => (
          <Link key={link.url} to={link.url} className="nav-link">
            {link.label}
          </Link>
        ))}
      </div>
      <div className="right col-auto">
        {user && (
          <>
            <Button btnStyle={"notif"} icon={notifLight} />
            <span
              className="user-name text-nowrap d-flex align-centered"
              onClick={toggler}>
              <span>{user?.employee_name}</span>
              <img
                src={dropdownIcon}
                className="dropdown-icon"
                alt="caret-down"
              />
            </span>
          </>
        )}
        {toggle && (
          <div className="dropdown-menu">
            <a
              className="nav-link dropdown-item"
              onClick={() => {
                handleLogout();
                toggler();
              }}>
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
