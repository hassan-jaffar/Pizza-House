import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./Responsiveness.css";

function ItemDetail() {
  return (
    <>
      <Navbar />
      <div className="row justify-content-center responsiveness my-5">
        <div className="col-md-10 bs br py-5 px-5">
          <div className="row">
            <div className="col-md-4">
              <img
                className="detailpageimg br"
                src="https://www.cheezious.com/api/image?url=https%3A%2F%2Fem-cdn.eatmubarak.pk%2Frestaurant_new%2F%2F%2Fdish%2F16027791221858590131.jpg&w=1920&q=100"
                alt=""
              />
              <h4 className="boldtext redclr mt-5">Product Description</h4>
              <p>4 Pcs Stuffed Calzone Chunks Served with Sauce & Fries</p>
            </div>
            <div className="col-md-4">
              <h3 className="boldtext redclr mb-5">Item Name</h3>
              <p>
                <i className="fa-solid fa-clock me-2 redclr"></i>ETA: 45
                minute(s)
              </p>
              <p>
                <i className="fa-solid fa-location-pin me-3 redclr"></i>Airline
                Society, Lahore
              </p>
              <p>
                <i className="fa-solid fa-bus me-2 redclr"></i>Delivered by
                Pizza House
              </p>
              <h5 className="boldtext my-5 redclr">Price</h5>
              <button className="btn addtocartbtn w-100">Add to Cart</button>
            </div>
            <div className="col-md-4">
              <div className="container px-5">
                <div className="row">
                  <div className="col-md-2">
                    <h4>
                      <i className="fa-solid fa-money-bill redclr"></i>
                    </h4>
                  </div>
                  <div className="col-md-10">
                    <p className="boldtext redclr">Cash On Delivery</p>
                    <p>Pay once you get the order</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-2">
                    <h4>
                      <i className="fa-solid fa-truck redclr"></i>
                    </h4>
                  </div>
                  <div className="col-md-10">
                    <p className="boldtext redclr">Quick Delivery</p>
                    <p>Our ETA is 45 minute(s)</p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-md-2">
                    <h4>
                      <i className="fa-solid fa-headset redclr"></i>
                    </h4>
                  </div>
                  <div className="col-md-10">
                    <p className="boldtext redclr">Customer Support</p>
                    <p>Contact us by email or phone</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ItemDetail;
