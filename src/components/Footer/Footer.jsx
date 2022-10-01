import React from "react";

function Footer() {
  let now = new Date();
  return (
    <footer className="footer">
      <p className="footerText">Copyright {now.getFullYear()} Argent Bank</p>
    </footer>
  );
}

export default Footer;
