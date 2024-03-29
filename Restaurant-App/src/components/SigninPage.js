import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import "../Css/Signin.css";

function SigninPage() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  async function Login(e) {
    e.preventDefault()
    const user = {
      email,
      password,
    }

    try {
      // setloading(true)
      const result = (await axios.post('https://res.creativeparkingsolutions.com/api/user/login', user)).data;

      localStorage.setItem('currentuser', JSON.stringify(result.data));

      if (result.data[0].customer_Id != null) {

        localStorage.setItem('status', 'true');
      }
      else {


        localStorage.setItem('status', 'false');
      }


      toast.success("Login Successfull")
      setInterval(() => {
        window.location.href = "/"
      }, 2000);
      // setloading(false)

      setemail('');
      setpassword('');

    }
    catch (error) {
      console.log(error);
      toast.warn("Invalid credentials")
      // setloading(false)
    }

  }
  return (
    <>
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-lg-4 text-center mt-2 responsiveness">
          <Link to="/">
            <img
              className="menuimg"
              src={require("../Images/logo.png")}
              alt=".."
            />
          </Link>
          <h3 className="boldtext my-3">WELCOME BACK</h3>
          <form>
            <div className="mt-5 mb-2 ms-5 me-2 text-start centeredItems">
              <label for="emailad">Email Address</label>
              <input
                id="emailad"
                type="email"
                className="form-control mb-4"
                placeholder="Email"
                value={email}
                onChange={(e) => { setemail(e.target.value) }}
                required
              />
              <label for="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-control mb-4"
                placeholder="Password"
                value={password}
                onChange={(e) => { setpassword(e.target.value) }}
                required
              />
              <div class="form-check mt-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="checkbox"
                />
                <label class="form-check-label" for="checkbox">
                  Remember Me
                </label>
              </div>
            </div>

            <div>
              <button
                className="btn btn-primary signinbtn"
                onClick={Login}
              >
                SIGN IN
              </button>
            </div>
          </form>

          <p className="my-3">
            Do you have an account yet? <Link to="/register">Register</Link>
          </p>
        </div>
        <div className="col-lg-8 responsiveness">
          <img
            className="signinimg"
            src="https://img.lovepik.com/photo/20211122/large/lovepik-pizza-picture_500753800.jpg"
            alt=".."
          />
        </div>
      </div>
    </>
  );
}

export default SigninPage;
