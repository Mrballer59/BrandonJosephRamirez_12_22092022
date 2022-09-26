import { NavLink } from "react-router-dom";
import mainLogo from "../../assets/argentBankLogo.png";
import {
  faUserCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

const Nav = ({ userFirstName }) => {
  return (
    <div>
      <nav className="main-nav">
        <NavLink to="/">
          <img src={mainLogo} alt="Logo of Argent Bank" />
        </NavLink>
        {userFirstName ? (
          <div className="main-nav-item">
            <NavLink to="/user">
              <div className="underline-text">
                <FontAwesomeIcon icon={faUserCircle} />
                {userFirstName}
              </div>
            </NavLink>
            <NavLink to="/">
              <div className="underline-text">
                <FontAwesomeIcon icon={faRightFromBracket} />
                Sign Out
              </div>
            </NavLink>
          </div>
        ) : (
          <NavLink to="/sign-in">
            <div className="main-nav-item sign-in underline-text">
              <FontAwesomeIcon icon={faUserCircle} />
              Sign In
            </div>
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Nav;
