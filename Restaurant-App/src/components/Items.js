import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

function Items({ items, categorys }) {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState();
  const getstatus = localStorage.getItem("status");

  const [category, setcategory] = useState([]);
  const [item, setItem] = useState([]);
  function location() {
    window.location.href = "/login";
  }
  const handleClose = () => setShow(false);
  async function AddtoCart() {
    const cartDetail = {
      price: items.Price,
      ProductID: items.ID,
      quantity: quantity,
      userID: JSON.parse(localStorage.getItem("currentuser"))[0].customer_Id,
      order_id: items.ID,
    };

    console.log(cartDetail);
    try {
      const result = await axios.post(
        "http://localhost:5000/api/admin/cart",
        cartDetail
      );
      console.log(result);
      toast.success("Item has been added to cart");
      setQuantity("");
    } catch (error) {
      console.log(error);
      toast.warn("Failed! Try again later");
    }

    setShow(false);
  }
  const handleShow = () => setShow(true);

  function showAlert() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Dear user, you must have in login first to add to cart. Thank you!",
      footer: '<a href="/login">Login and register</a>',
    });
  }
  return (
    <>
      {items.category_id === categorys.ID ? (
        <>
          <div
            className="row productcard bs"
            type="button"
            // onClick={() => {
            //   showmodal(item);
            // }}
            // data-bs-toggle="modal"
            // data-bs-target="#addtocart"
          >
            <div className="col-12 producttext text-center">
              <img className="productimg" src={items.Image} alt=".." />
              <h5 className="boldtext">{items.Title}</h5>
              {items.Description !== "undefined" ? (
                <p>{items.Description}</p>
              ) : (
                <></>
              )}
              <hr />
              {items.Price !== "undefined" ? (
                <h5 className="itemprice">$ {items.Price}</h5>
              ) : (
                <></>
              )}
              <button
                className="btn addtocartbtn"
                onClick={getstatus === "true" ? handleShow : showAlert}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{items.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <img
                className="detailpageimg br"
                src={items.Image}
                alt=""
              />
              <h4 className="boldtext redclr mt-5">Product Description</h4>
              <p>{items.Description}</p>
            </div>
            <div className="col-md-6">
              <h3 className="boldtext redclr mb-5">{items.Title}</h3>
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
              <h5 className="boldtext my-5 redclr">${items.Price}</h5>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                    required
                  />
                </Form.Group>
              </Form>
              <button className="btn addtocartbtn w-100" onClick={AddtoCart}>Add to Cart</button>
            </div>
          </div>
          {/* <div className="row">
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
          <hr /> */}
          {/* <div className="row">
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
          </div> */}
          {/* <div className="row">
            <div className="col-md-12">
            <h5> ${items.Price}</h5>
          <p>{items.Title}</p>

            </div>
          </div> */}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button
            variant="outline-dark"
            size="lg"
            style={{ width: "100%" }}
            onClick={AddtoCart}
          >
            Add to Cart
          </Button>
        </Modal.Footer> */}
      </Modal>

      {/* <ToastContainer /> */}
    </>
  );
}

export default Items;
