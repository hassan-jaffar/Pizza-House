import React,{ useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../Css/RegisterPage.css"
import Swal from 'sweetalert2'
import 'react-toastify/dist/ReactToastify.css';
function RegisterPage() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [number, setnumber] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  async function register(e){
    if (password === cpassword) {
        const user = {
            name,
            email,
            number,
            password,
            cpassword
        };

        console.log(user)

        try {

            // setloading(true)
            const result = await axios.post("https://apinodejs.creativeparkingsolutions.com/api/user/register",user).data;
            console.log(result)
            toast.success("Registration Successfull")
            // setloading(true)
            setInterval(() => {
              window.location.href = "/"
            }, 2000);

            


            setname('')
            setemail('')
            setnumber('')
            setpassword('')
            setcpassword('')

        } catch (error) {
            console.log(error);
            toast.warn("Something went wrong!")
            e.preventDefault()
            // setloading(true)
        }
    }
    else{
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
        <div className="row justify-content-center">
          <div className="col-md-4 text-center mt-2 responsiveness">
          <Link to="/">
              <img
                className="menuimg"
                src={require("../Images/logo.png")}
              />
            </Link>
            <h3 className="boldtext my-3">SIGN UP</h3>
            <form>
              <div className="my-5 ms-5 me-2 text-start centeredRegItems">
                <label for="namee">Name</label>
                <input
                  id="namee"
                  type="text"
                  className="form-control mb-4"
                  placeholder="Name"
                  value={name} 
                  onChange={(e) => { setname(e.target.value) }}
                  required
                />
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
                <label for="phoneno">Phone</label>
                <input
                  id="phoneno"
                  type="tel"
                  className="form-control mb-4"
                  placeholder="Phone"
                  value={number} 
              onChange={(e) => { setnumber(e.target.value) }}
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
                <label for="cpassword">Confirm Password</label>
                <input
                  id="cpassword"
                  type="password"
                  className="form-control mb-4"
                  placeholder="Confirm Password"
                  value={cpassword} 
                  onChange={(e) => { setcpassword(e.target.value) }}
                  required
                />
                <div className="disablediv">
                  <iframe
                    title="reCAPTCHA"
                    src="https://images.pexels.com/photos/845808/pexels-photo-845808.jpeg?cs=srgb&dl=pexels-pablo-macedo-845808.jpg&fm=jpg"
                    width="304"
                    height="78"
                    role="presentation"
                    name="a-yjjttnpaq2gk"
                    frameborder="0"
                    scrolling="no"
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                  ></iframe>
                </div>
              </div>

              <div className="mb-5">
                <button
                  className="btn btn-primary registerbtn"
                  // type="submit"
                  // formmethod="post"
                  onClick={register}
                >
                  SIGN IN
                </button>
                <button className="btn btn-light registerbtn">
                  <i class="fa-brands fa-google"></i> GOOGLE
                </button>
                <button className="btn btn-light registerbtn">
                  <i class="fa-brands fa-square-facebook"></i> FACEBOOK
                </button>
              </div>
            </form>

            <p className="mb-5">
              Already have an account yet? <Link to="/">Login</Link>
            </p>
          </div>
          <div className="col-md-8 disablediv responsiveness">
            <img
              className="registerimg"
              src="https://img.lovepik.com/photo/20211122/large/lovepik-pizza-picture_500753800.jpg"
            />
          </div>
        </div>
    </>
  );
}

export default RegisterPage;
