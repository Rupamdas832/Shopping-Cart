import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <p>
        Design and developed by <span>Rupam</span>
      </p>
      <div className="socialLinks">
        <a
          href="https://www.linkedin.com/in/rupam-das-82362a105/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="https://twitter.com/RupamDa52450809"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-twitter-square"></i>
        </a>
        <a
          href="https://www.instagram.com/goodgradiot/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-instagram-square"></i>
        </a>
      </div>
    </div>
  );
};
