import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const getstatus = localStorage.getItem("status");
  const [name, setname] = useState(JSON.parse(localStorage.getItem("currentuser"))[0].name);
  const [email, setemail] = useState(JSON.parse(localStorage.getItem("currentuser"))[0].email);
  const [number, setnumber] = useState(JSON.parse(localStorage.getItem("currentuser"))[0].number);

  async function updatecustomer(e){
    const details = {
      customer_Id:JSON.parse(localStorage.getItem('currentuser'))[0].customer_Id,
      name,
      email,
      number
    }
    try {

      // setloading(true)
      const result = await axios.post("http://localhost:5000/api/admin/myprofile",details).data;
      console.log(result)
      toast.success("Profile has been updated")
      // setloading(true)
      setInterval(() => {
        window.location.href = "/home"
      }, 2000);

      
      setemail('');
      setname('');
      setnumber('');

  } catch (error) {
      console.log(error);
      toast.warn("Something went wrong!")
      e.preventDefault()
      // setloading(true)
  }
  }

  return (
    <>
    <ToastContainer />
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
                      <i class="fa-solid fa-user"></i>
                      <span className="ms-1 d-none d-sm-inline">
                        My Profile
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/orders"
                      className="nav-link align-middle px-0 sidebartag"
                    >
                      <i class="fa-solid fa-chart-line"></i>
                      <span className="ms-1 d-none d-sm-inline">
                        My Orders
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/addresses"
                      className="nav-link align-middle px-0 sidebartag"
                    >
                      <i class="fa-solid fa-location-dot"></i>
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
                      <i class="fa-solid fa-lock-open"></i>
                      <span className="ms-1 d-none d-sm-inline">Password</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-9"> */}
              <div className="row justify-content-center">
                <div className="col-md-6 bs br mx-4 my-5 py-4 px-4 responsiveness reducedwidth">
                  <div className="container userprofileinfo">
                  <h1 className="responsiveness usertitle">USER PROFILE</h1>
                    <Link to="/cart-checkout">
                      <button className="btn usercartbtn">
                        <i class="fa-solid fa-bag-shopping btnicon"></i> CART
                      </button>
                    </Link>
                    {/* <Link to="/editprofile">
                      <button className="btn usercartbtn">
                        <i class="fa-solid fa-pencil btnicon"></i> Edit
                      </button>
                    </Link> */}
                  </div>
                  <br />
                  <hr />
                  <br />
                  <label for="namee">Name</label>
                  <input
                    id="namee"
                    className="form-control mb-4"
                    placeholder="Name"
                    value={name}
                    onChange={(e)=>{setname(e.target.value)}}
                    required
                  />
                  <label for="emailad">Email Address</label>
                  <input
                    id="emailad"
                    className="form-control mb-4"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>{setemail(e.target.value)}}
                    required
                  />
                  <label for="phoneno">Phone</label>
                  <input
                    id="phoneno"
                    className="form-control mb-4"
                    placeholder="Phone"
                    value={number}
                    onChange={(e)=>{setnumber(e.target.value)}}
                    required
                  />
                  <button className="btn usercartbtn" onClick={updatecustomer}>
                    Update
                  </button>
                </div>
                <div className="col-md-4 text-start bs br mx-3 my-5 py-4 px-4 profileinfo responsiveness reducedwidth">
                  <p>INFO</p>
                  <br />
                  <hr />
                  <br />
                  <p>Total Orders: 0</p>
                  <br />
                  <hr />
                  <br />
                  <p>Last Added Address: ---</p>
                </div>
              </div>
            {/* </div>
          </div>
        </div> */}
    </>
  );
}

export default Profile;
