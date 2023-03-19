import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="site-header">
      <span>LOGO</span>
      <Link to="/">
        <h1>DOBU Blogposts</h1>
      </Link>
    </div>
  );
}

export default Header;
