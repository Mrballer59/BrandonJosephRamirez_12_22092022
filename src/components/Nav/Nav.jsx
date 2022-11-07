import React from "react";
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import mainLogo from "../../assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../auth/authSlice";
import "../../styles/index.css";

export default function Nav() {
  const dispatch = useDispatch();
  const { token, firstName } = useSelector((state) => state.auth);

  //function to log out
  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          src={mainLogo}
          alt="Logo of Argent Bank"
          className="main-logo-nav"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      {token ? (
        <div>
          <NavLink className="main-nav-item">
            <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
            {firstName}
          </NavLink>
          <NavLink>
            <button className="signout-btn" to="/" onClick={onLogout}>
              <FontAwesomeIcon icon={faSignOut} className="user-icon" />
              Sign Out
            </button>
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink className="main-nav-item" to="/sign-in">
            <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
            Sign In
          </NavLink>
        </div>
      )}
    </nav>
  );
}
