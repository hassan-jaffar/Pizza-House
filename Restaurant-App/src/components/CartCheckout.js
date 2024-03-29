import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function CartCheckout() {
  const [address, setAddress] = useState([]);
  const [comment, setcomment] = useState();
  const [house, sethouse] = useState("");
  const [postcode, setpostcode] = useState("");
  const [flat, setflat] = useState("");
  const [street, setstreet] = useState("");
  const [town, settown] = useState("");
  const [items, setItems] = useState([]);
  const getstatus = localStorage.getItem("status");
  const [visible, setvisible] = useState(false)
  const refClose = useRef(null);

  async function addAddress() {
    const info = {
      house,
      postcode,
      flat,
      street,
      town,
      customer_Id: JSON.parse(localStorage.getItem("currentuser"))[0]
        .customer_Id,
    };
    try {
      const data = (
        await axios.post(
          "https://res.creativeparkingsolutions.com/api/user/addaddress",
          info
        )
      ).data;
      console.log(data.data);
      refClose.current.click();
      updateAddress();
      toast.success("New address added");

      sethouse("");
      setpostcode("");
      setflat("");
      setstreet("");
      settown("");
    } catch (error) {
      console.log(error);
      toast.warn("Failed! Try again later");
    }
  }

  async function add(orderID, quantitys, price) {
    const info = {
      orderID,
      quantitys,
      price,
      customer_Id: JSON.parse(localStorage.getItem("currentuser"))[0]
        .customer_Id,
    };

    try {
      const data = (
        await axios.post(
          "https://res.creativeparkingsolutions.com/api/admin/updatecart",
          info
        )
      ).data;
      console.log(data.data);
      update();
      toast.success("Quantity increase");
    } catch (error) {
      console.log(error);
      toast.warn("Failed! Try again later");
    }
  }

  async function remove(orderID, quantitys, price) {
    const info = {
      orderID,
      quantitys,
      price,
      customer_Id: JSON.parse(localStorage.getItem("currentuser"))[0]
        .customer_Id,
    };

    try {
      const data = (
        await axios.post(
          "https://res.creativeparkingsolutions.com/api/admin/updatecart",
          info
        )
      ).data;
      console.log(data.data);
      update();
      toast.success("Quantity decrease");
    } catch (error) {
      console.log(error);
      toast.warn("Failed! Try again later");
    }
  }

  async function del(orderID) {
    const info = {
      orderID,
    };

    try {
      const data = (
        await axios.post(
          "https://res.creativeparkingsolutions.com/api/admin/updatecart",
          info
        )
      ).data;
      console.log(data.data);
      update();
      toast.warn("Item has been deleted");
    } catch (error) {
      console.log(error);
      toast.warn("Failed! Try again later");
    }
  }

  async function update() {
    if (getstatus === "true") {
      const user = JSON.parse(localStorage.getItem("currentuser"))[0]
        .customer_Id;

      const temp = {
        customer_Id: user,
      };
      try {
        const data = (
          await axios.post(
            "https://res.creativeparkingsolutions.com/api/admin/getcartitems",
            temp
          )
        ).data;
        console.log(data.data);
        setItems(data.data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function updateAddress() {
    const user = {
      customer_Id: JSON.parse(localStorage.getItem("currentuser"))[0]
        .customer_Id,
    };
    try {
      const data = await (
        await axios.post(
          "https://res.creativeparkingsolutions.com/api/user/getaddress",
          user
        )
      ).data;
      setAddress(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const user = {
        customer_Id: JSON.parse(localStorage.getItem("currentuser"))[0]
          .customer_Id,
      };
      try {
        const data = await (
          await axios.post(
            "https://res.creativeparkingsolutions.com/api/user/getaddress",
            user
          )
        ).data;
        setAddress(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (getstatus === "true") {
      const user = JSON.parse(localStorage.getItem("currentuser"))[0]
        .customer_Id;
      async function fetchData() {
        const temp = {
          customer_Id: user,
        };
        try {
          const data = (
            await axios.post(
              "https://res.creativeparkingsolutions.com/api/admin/getcartitems",
              temp
            )
          ).data;
          console.log(data.data);
          setItems(data.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }, []);

  let total = 0;
  for (var i = 0; i < items.length; i++) {
    let productTotal = items[i].totalp;
    total = total + parseFloat(productTotal);
  }

  async function checkout() {
    const user = {
      comment,
      customer_Id: JSON.parse(localStorage.getItem("currentuser"))[0]
        .customer_Id,
      total,
    };

    console.log(user);

    try {
      // setloading(true)
      const result = await axios.post(
        "https://res.creativeparkingsolutions.com/api/admin/cartcheckout",
        user
      ).data;
      console.log(result);
      toast.success("Checkout Successfull");
      // setloading(true)
      setInterval(() => {
        window.location.href = "/menu";
      }, 2000);

      setcomment("");
    } catch (error) {
      console.log(error);
      toast.warn("Something went wrong!");
      // setloading(true)
    }
  }

  var times = [
    "4:30PM - 5:00PM",
    "5:00PM - 5:30PM",
    "5:30PM - 6:00PM",
    "6:00PM - 6:30PM",
    "6:30PM - 7:00PM",
    "7:00PM - 7:30PM",
    "7:30PM - 8:00PM",
    "8:00PM - 8:30PM",
    "8:30PM - 9:00PM",
    "9:00PM - 9:30PM",
    "9:30PM - 10:00PM",
    "10:00PM - 10:30PM",
    "10:30PM - 11:00PM ",
  ];
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="row justify-content-center my-5">
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-6">
              <div className="container checkout-box bs br my-4 px-5 py-3 responsiveness">
                <h6 className="redclr">DELIVERY/COLLECTION</h6>
                <hr />
                <div className="form-check ordertype">
                  <input
                    className="form-check-input redclr"
                    type="radio"
                    name="ordertype"
                    id="ordertype1"
                    value="0"
                    onClick={() => { setvisible(true) }}

                    required
                  />
                  <label className="form-check-label" for="ordertype1">
                    Delivery
                  </label>
                </div>

                <div className="form-check ordertype">
                  <input
                    className="form-check-input redclr"
                    type="radio"
                    name="ordertype"
                    id="ordertype2"
                    value="1"
                    onClick={() => { setvisible(false) }}
                    checked
                    required
                  />
                  <label className="form-check-label" for="ordertype2">
                    Collection
                  </label>
                </div>



                {visible && (
                  <>


                    <h5 className="mt-4 boldtext">Delivery Address</h5>

                    {address ? (
                      address.map((addresses) => {
                        return (
                          <>
                            {addresses.address_status === 1 ? (
                              <>
                                <div className="form-check">
                                  <input
                                    className="form-check-input mt-3"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id={`flexRadioDefault${addresses.ID}`}
                                    checked
                                  />
                                  <label
                                    className="form-check-label"
                                    for={`flexRadioDefault${addresses.ID}`}
                                  >
                                    <h6 className="mt-3 boldtext">
                                      House no:{addresses.house},Flat:
                                      {addresses.flat},{addresses.street},
                                      {addresses.postcode},{addresses.town}
                                    </h6>
                                  </label>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="form-check">
                                  <input
                                    className="form-check-input mt-3"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id={`flexRadioDefault${addresses.ID}`}
                                    disabled
                                  />
                                  <label
                                    className="form-check-label"
                                    for={`flexRadioDefault${addresses.ID}`}
                                  >
                                    <h6 className="mt-3 boldtext">
                                      House no:{addresses.house},Flat:
                                      {addresses.flat},{addresses.street},
                                      {addresses.postcode},{addresses.town}
                                    </h6>
                                  </label>
                                </div>
                              </>
                            )}
                          </>
                        );
                      })
                    ) : (
                      <>
                        <h6 className="mt-3 boldtext">
                          You dont have any address. Please add one
                        </h6>
                      </>
                    )}

                    <button
                      type="button"
                      className="btn usercartbtn w-100 mt-3 mb-5"
                      data-bs-toggle="modal"
                      data-bs-target="#addressModal"
                    >
                      Add New Address
                    </button>
                    <h5 className="boldtext">Delivery Time</h5>
                    <div className="dropdown timelist mb-4">
                      <button
                        className="btn btn-light w-100 dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Select Time
                      </button>
                      <ul
                        className="dropdown-menu timelist"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        {
                          times.map((time) => (
                            <>
                              <li className="dropdown-item time">{time}</li>
                            </>
                          ))
                        }
                      </ul>
                    </div>
                  </>
                )}
              </div>

              <div className="container checkout-box bs br my-4 px-5 py-3 responsiveness">
                <h6 className="redclr">ORDER ITEMS</h6>
                <hr />
                <div className="table-responsive cart-items">
                  <table className="table table-hover table-borderless mb-0">
                    <thead className="light">
                      <tr>
                        <th></th>
                        <th className="redclr">Product</th>
                        <th className="redclr">Items</th>
                        <th className="redclr">Price</th>
                        <th className="text-end redclr">Total</th>
                        <th className="text-end redclr">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items &&
                        items.map((item) => {
                          return (
                            <>
                              <tr className="items">
                                <td>
                                  <img
                                    src={item.Image}
                                    data-src="/uploads/restorants/01840cf4-a5e0-4556-85f7-a7536920d799_thumb.jpg"
                                    width="50"
                                    height="70"
                                    alt=""
                                    className="productImage"
                                  />
                                </td>
                                <td>
                                  <strong>{item.Title}</strong>
                                </td>
                                <td>{item.Quantity}</td>
                                <td>RS. {item.Price}</td>
                                <td className="text-end">
                                  RS. {item.Quantity * item.Price}
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-outline-dark btn-icon btn-sm page-link btn-cart-radius my-1"
                                  >
                                    <span
                                      className="btn-inner--icon btn-cart-icon"
                                      onClick={() => {
                                        remove(
                                          item.orderitemid,
                                          item.Quantity - 1,
                                          item.Price
                                        );
                                      }}
                                    >
                                      <i className="fa fa-minus redclr"></i>
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    value="1661936711"
                                    className="btn btn-outline-dark btn-icon btn-sm page-link btn-cart-radius my-1"
                                    onClick={() => {
                                      add(
                                        item.orderitemid,
                                        item.Quantity + 1,
                                        item.Price
                                      );
                                    }}
                                  >
                                    <span className="btn-inner--icon btn-cart-icon">
                                      <i className="fa fa-plus redclr"></i>
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    value="1661936711"
                                    className="btn btn-outline-dark btn-icon btn-sm page-link btn-cart-radius my-1"
                                    onClick={() => {
                                      del(item.orderitemid);
                                    }}
                                  >
                                    <span className="btn-inner--icon btn-cart-icon">
                                      <i className="fa fa-trash redclr"></i>
                                    </span>
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="addressModal"
              tabindex="-1"
              aria-labelledby="addressModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addressModalLabel">
                      ADD NEW ADDRESS
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row justify-content-center">
                      <div className="col-md-10">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13611.200265534018!2d74.3023612!3d31.4746856!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd90d41edbbe08d45!2sINNOVATION.TECH!5e0!3m2!1sen!2s!4v1660646556492!5m2!1sen!2s"
                          width="100%"
                          height="150px"
                          allowfullscreen=""
                          loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <input
                          className="form-control my-3 px-2"
                          placeholder="Search address using Postal Code, street, etc"
                        />
                      </div>
                      <div className="col-md-5">
                        <label for="houseno">House/Door No.</label>
                        <input
                          className="form-control mb-3 px-2"
                          placeholder="House/Door No."
                          id="houseno"
                          value={house}
                          onChange={(e) => {
                            sethouse(e.target.value);
                          }}
                          required
                        />
                        <label for="postcode">Postcode</label>
                        <input
                          className="form-control mb-3 px-2"
                          placeholder="Postcode"
                          id="postcode"
                          value={postcode}
                          onChange={(e) => {
                            setpostcode(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div className="col-md-5">
                        <label for="flat">Flat</label>
                        <input
                          className="form-control mb-3 px-2"
                          placeholder="Flat"
                          id="flat"
                          value={flat}
                          onChange={(e) => {
                            setflat(e.target.value);
                          }}
                        />
                        <label for="street">Street</label>
                        <input
                          className="form-control mb-3 px-2"
                          placeholder="Street"
                          id="street"
                          value={street}
                          onChange={(e) => {
                            setstreet(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div className="col-md-10">
                        <label for="town">Town</label>
                        <input
                          className="form-control my-3 px-2"
                          placeholder="Postal Town"
                          id="town"
                          value={town}
                          onChange={(e) => {
                            settown(e.target.value);
                          }}
                          required
                        />
                        <div className="form-check form-switch my-3">
                          <label
                            className="form-check-label"
                            for="flexSwitchCheckDefault"
                          >
                            Default Address
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      data-bs-dismiss="modal"
                      ref={refClose}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={addAddress}
                      className="btn btn-outline-dark"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="container checkout-box bs br my-4 px-5 py-3 responsiveness">
                <h6 className="redclr">CHECKOUT</h6>
                <hr />
                <h6 className="boldtext redclr">Subtotal: RS. {total}</h6>
                <h6 className="boldtext redclr">Delivery: RS. 0.0</h6>
                <h6 className="boldtext redclr">Total: RS. {total}</h6>
                <br />
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Your comments here..."
                  value={comment}
                  onChange={(e) => {
                    setcomment(e.target.value);
                  }}
                  required
                ></textarea>
                <div className="form-check mt-3 mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymenttype"
                    id="payment1"
                    checked
                    required
                  />
                  <label className="form-check-label" for="payment1">
                    Cash on Delivery
                  </label>
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymenttype"
                    id="payment2"
                    required
                  />
                  <label className="form-check-label" for="payment2">
                    Pay with Card
                  </label>
                </div>
                <button className="btn usercartbtn w-100 mb-3" onClick={checkout}>
                  Place Order
                </button>
                <div className="form-check mb-5">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckIndeterminate"
                  />
                  <label
                    className="form-check-label"
                    for="flexCheckIndeterminate"
                  >
                    I agree to the Terms of Service and Privacy Policy.
                  </label>
                </div>
              </div>
              <div className="container checkout-box bs br my-4 px-5 py-3 responsiveness">
                <h6 className="redclr">HAVE A PROMO CODE?</h6>
                <hr />
                <input
                  className="form-control"
                  placeholder="Enter your promo code here"
                />
                <p className="boldtext">
                  Only one promo code must be used per order
                </p>
                <button className="btn usercartbtn">Apply</button>
              </div>
            </div>
            <Link to="/menu">
              <button className="btn usercartbtn w-auto backbutton">Back</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartCheckout;
