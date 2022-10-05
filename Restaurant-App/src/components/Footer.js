import React from "react";
import "../Css/Footer.css";
import { Link } from "react-router-dom";
import "./Responsiveness.css";
function Footer() {
  return (
    <>
      <div className="row footer justify-content-center responsiveness">
        <div className="row">
          <div className="col-md-2 text-center">
            <img
              className="footerimg"
              src={require("../Images/logo.png")}
              alt="logo"
            />
          </div>
          <div className="col-md-5 text-start">
            <h4 className="boldtext redclr">Contact Us</h4>
            <Link to="/">
              <i className="fa-solid fa-phone redclr me-3"></i> 051111446699
            </Link>
            <br />
            <br />
            <Link to="/">
              <i className="fa-solid fa-message redclr me-3"></i>
              support@pizzahouse.com
            </Link>
            <br />
            <br />
            <Link to="/">
              <i className="fa-solid fa-location-pin redclr me-3"></i> Pizza
              House, Sahiwal
            </Link>
            <br />
          </div>
          <div className="col-md-5 text-start pushdown">
            <h4 className="boldtext redclr">
              <i className="fa-solid fa-clock redclr"></i> Our Timing:
            </h4>
            <div className="row">
              <div className="col-6">
                <p>Monday-Saturday</p>
                <p>Friday</p>
                <p>Sunday</p>
              </div>
              <div className="col-6">
                <p>11:00 AM - 03:00 AM</p>
                <p>02:00 PM - 03:00 AM </p>
                <p>11:00 AM - 03:00 AM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <hr className="seperator" />
            <br />
            <p className="boldtext ts">
              Developed by{" "}
              <a href="https://innovationhightech.com" target="_blank">
                INNOVATION.TECH
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
