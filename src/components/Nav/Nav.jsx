import React from "react";
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import mainLogo from "../../assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../config/authentification";
import "../../styles/index.css";

export default function Nav() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { entryUser } = useSelector((state) => state.profile);

  //function to log out
  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img src={mainLogo} alt="Logo of Argent Bank" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      {isLoggedIn ? (
        entryUser === null ? (
          <p>Loading & getting your profile ready </p>
        ) : (
          <div>
            <NavLink className="main-nav-item" to="/sign-in">
              <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
              {entryUser.body.firstName}
            </NavLink>
            <button className="signout-btn" onClick={logoutUser}>
              <FontAwesomeIcon icon={faSignOut} className="user-icon" />
              Sign Out
            </button>
          </div>
        )
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
