import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "../Css/order.css";
import moment, { HTML5_FMT } from "moment";
import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";

function Orders() {
  const { RangePicker } = DatePicker;
  const [order, setOrder] = useState([]);
  const [duplicateorder, setduplicateorder] = useState([]);
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();

  const getstatus = localStorage.getItem("status");

  function filterByDate2(dates) {
    if (dates) {
      setfromdate(moment(dates[0]).format("DD-MM-YYYY"));
      settodate(moment(dates[1]).format("DD-MM-YYYY"));

      if (dates[0] && dates[1]) {
        const temporders = duplicateorder.filter((orders) => {
          console.log(
            Date.parse(dates[0]._d),
            Date.parse(orders.DateTime),
            Date.parse(dates[1]._d)
          );
          return (
            Date.parse(dates[0]._d) < Date.parse(orders.DateTime) &&
            Date.parse(dates[1]._d) > Date.parse(orders.DateTime)
          );
        });
        setOrder(temporders);
      } else {
        setOrder(order);
      }
    } else {
      setOrder(order);
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
          await axios.post("http://localhost:5000/api/admin/getcart", user)
        ).data;
        setOrder(data.data);
        setduplicateorder(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      {/* <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar">
              <div className="d-flex flex-column align-items-center px-3 pt-2 min-vh-100">
                <h5 className="my-5 text-center">
                  {getstatus === "true" ? (
                    <>
                      {JSON.parse(localStorage.getItem("currentuser"))[0].name}
                    </>
                  ) : (
                    <>user name</>
                  )}
                </h5>
                <ul
                  className="nav nav-tabs mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                  <li className="nav-item">
                    <Link
                      to="/profile"
                      className="nav-link align-middle px-0 sidebartag"
                    >
                      <i className="fa-solid fa-user"></i>
                      <span className="ms-1 d-none d-sm-inline">
                        {" "}
                        My Profile
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/orders"
                      className="nav-link align-middle px-0 sidebartag"
                    >
                      <i className="fa-solid fa-chart-line"></i>
                      <span className="ms-1 d-none d-sm-inline">
                        {" "}
                        My Orders
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/addresses"
                      className="nav-link align-middle px-0 sidebartag"
                    >
                      <i className="fa-solid fa-location-dot"></i>
                      <span className="ms-1 d-none d-sm-inline">
                        My Addresses
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/change-password"
                      className="nav-link align-middle px-0 sidebartag"
                    >
                      <i className="fa-solid fa-lock-open"></i>
                      <span className="ms-1 d-none d-sm-inline">Password</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-9"> */}
      <div className="row justify-content-center">
        <div className="col-md-10 mx-5 mt-5 mb-2 pt-2 pb-5 px-5 br bs reducedwidth responsiveness">
          <div className="row">
            <div className="col-md-7">
              <h1 className="my-3 responsiveness usertitle">MY ORDERS</h1>
            </div>
            <div className="col-md-5">
                <div className="row my-4 py-2 px-2 orderfilter text-center align-items-center">
                  <div className="col-md-3">
                    <h5 className="boldtext">Filter</h5>
                  </div>
                  <div className="col-md-9">
                    <RangePicker format="DD-MM-YYYY" onChange={filterByDate2} />
                  </div>
                </div>
            </div>
          </div>

          {/* <label
                    for="customerfilter"
                    className="boldtext my-1 ms-2"
                  >

                    Filter by Customer:
                  </label>
                  <input
                    id="customerfilter"
                    className="mx-1 my-1 py-1"
                    placeholder="Select an option"
                  />
                  <button className="btn btn-primary my-1 mx-1">
                    Export
                  </button>
                  <button className="btn btn-primary my-1 mx-1">
                    Search
                  </button> */}
          <div className="row justify-content-center my-5">
            <h6>ORDER HISTORY</h6>
            <br />
            <hr />
            <br />
            <br />
            {order.length > 0 ? (
              <>
                <div className="table-responsive-sm">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Created</th>
                        <th scope="col">Method</th>
                        <th scope="col">Last status</th>
                        <th scope="col">Payment status</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      {order.map((orders) => {
                        return (
                          <>
                            <tr>
                              <td>
                                <span class="badge text-bg-info info">
                                  {orders.ID}
                                </span>
                              </td>
                              <td>
                                {moment(orders.DateTime).format(
                                  "MMMM Do YYYY, h:mm a"
                                )}
                              </td>
                              <td>
                                <span class="badge text-bg-primary primary">
                                  collection
                                </span>
                              </td>
                              <td>
                                <span class="badge text-bg-info info">
                                  {orders.Orderstatus === "1" ? (
                                    <>Pending</>
                                  ) : orders.Orderstatus === "2" ? (
                                    <>In Process</>
                                  ) : orders.Orderstatus === "3" ? (
                                    <>Completed</>
                                  ) : (
                                    <>Rejected</>
                                  )}
                                </span>
                              </td>
                              <td>
                                <span class="badge text-bg-primary primary">
                                  cod(unpaid)
                                </span>
                              </td>
                              <td>${orders.Price}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : order ? (
              <>
                <div className="table-responsive-sm">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Created</th>
                        <th scope="col">Method</th>
                        <th scope="col">Last status</th>
                        <th scope="col">Payment status</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      <tr>
                        <td>
                          <span class="badge text-bg-info info">
                            {order.ID}
                          </span>
                        </td>
                        <td>{order.DateTime}</td>
                        <td>
                          <span class="badge text-bg-primary primary">
                            collection
                          </span>
                        </td>
                        <td>
                          <span class="badge text-bg-info info">rejected</span>
                        </td>
                        <td>
                          <span class="badge text-bg-primary primary">
                            cod(unpaid)
                          </span>
                        </td>
                        <td>${order.Price}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <h4>You dont have any orders...</h4>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
