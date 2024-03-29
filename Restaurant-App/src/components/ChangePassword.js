import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function ChangePassword() {
  const getstatus = localStorage.getItem("status");
  const [password, setpassword] = useState("")
  const [new_password, setnew_password] = useState("")
  const [cpassword, setcpassword] = useState("")
  async function register(e) {
    if (new_password === cpassword) {
      const details = {
        customer_Id: JSON.parse(localStorage.getItem('currentuser'))[0].customer_Id,
        email: JSON.parse(localStorage.getItem('currentuser'))[0].email,
        password,
        new_password
      }
      try {

        // setloading(true)
        const result = await axios.post("https://res.creativeparkingsolutions.com/api/admin/changepassword", details).data;
        toast.success("Password has been changed")
        // setloading(true)
        setInterval(() => {
          window.location.href = "/"
        }, 2000);




        setnew_password('')
        setpassword('')
        setcpassword('')

      } catch (error) {
        console.log(error);
        toast.warn("Something went wrong!")
        e.preventDefault()
        // setloading(true)
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password and Confirm password are not matched!'
      })
      e.preventDefault()
    }
  }
  return (

    <>
      <ToastContainer />
      <div className="hidescroll">
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
                      <i class="fa-solid fa-chart-line"></i>
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
          <div className="col-md-10 bs br mx-5 my-5 py-5 px-5 reducedwidth responsiveness">
            <h1 className="responsiveness usertitle">CHANGE PASSWORD</h1>
            <div className="container userprofileinfo">
            </div>
            <br />
            <hr />
            <br />
            <input
              id="password"
              type="password"
              className="form-control mb-4 px-4 py-3"
              placeholder="Current Password"
              value={password}
              onChange={(e) => { setpassword(e.target.value) }}
            />
            <input
              id="npassword"
              type="password"
              className="form-control mb-4 px-4 py-3"
              placeholder="New Password"
              value={new_password}
              onChange={(e) => { setnew_password(e.target.value) }}
            />
            <input
              id="cpassword"
              className="form-control mb-4 px-4 py-3"
              placeholder="Confirm New Password"
              value={cpassword}
              onChange={(e) => { setcpassword(e.target.value) }}
            />
            <button className="btn btn-primary usercartbtn" onClick={register}>
              Update
            </button>
          </div>
        </div>
        {/* </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default ChangePassword;
