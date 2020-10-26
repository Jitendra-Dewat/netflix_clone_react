import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {

  const [show, handleShow] = useState(false);

  useEffect( () => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 50){
        handleShow(true);
      }else handleShow(false);
    });

    return () => {
      window.removeEventListener("scroll");
    };

  },[]);

  return (
    <div>
      <div className={`nav ${show && "nav_black"}`}>
        <img
          className="nav_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />

        <img
          className="nav_avatar"
          src="https://png.pngtree.com/png-vector/20190307/ourmid/pngtree-vector-edit-profile-icon-png-image_779419.jpg"
          alt="Avatar"
        />
      </div>
    </div>
  );
}

export default Nav;
