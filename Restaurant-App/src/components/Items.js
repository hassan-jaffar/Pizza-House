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
        "https://apinodejs.creativeparkingsolutions.com/api/admin/cart",
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
              <hr/>
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
          <h5> ${items.Price}</h5>
          <p>{items.Title}</p>
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            size="lg"
            style={{ width: "100%" }}
            onClick={AddtoCart}
          >
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <ToastContainer /> */}
    </>
  );
}

export default Items;