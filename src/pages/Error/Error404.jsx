import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/index.css";
function Error404() {
  return (
    <main className="main">
      <div className="error404">
        <h1>Error 404 Sorry page not found</h1>
        <NavLink to="/">
          <button>Go back to the home page </button>
        </NavLink>
      </div>
    </main>
  );
}
export default Error404;

{
  /* <NavLink to="/">
  <img src={mainLogo} alt="Logo of Argent Bank" />
</NavLink>; */
}
