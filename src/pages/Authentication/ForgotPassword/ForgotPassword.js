import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "config/firebase";

const intialState = { email: "" };
export default function ForgotPassword() {

  const [state, setState] = useState(intialState)
  
  const handleForget = (e) => {

    setState({...state, [e.target.name]: e.target.value})
    // console.log(state);

  }
  const HandleReset = (e) => {
    const { email } = state;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setState(intialState);
        toast.primary('Verification Email Has Been Sent!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error('Something Went Wrong!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }
  return (
    <div className="auth">
      {/* <div className='d-flex justify-content-center align-items-center min-vh-100'> */}
      <div className="container mt-5 py-xxl-5">
        <div className=" text-center">
          <Link to="/" className="btn btn-success my-2" >
            <i class="fa-solid fa-house mx-2"></i> Home </Link>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6 offset-md-3 p-sm-3 shadow rounded">
            <div className="card p-3 p-sm-3 p-md-3 p-lg-4">
            <div className="text-center mt-4">
              <h1>Forget Password</h1>
              <p>You can reset password here</p>
            </div>
              <div class="input-group mb-3">
                <input type="text" class="form-control" onChange={handleForget} placeholder="Enter Your Email" name="email" value={state.email} />
                <span class="input-group-text" id="basic-addon2"> <span class="material-symbols-outlined">
                  mail
                </span></span>
              </div>

              <div className='text-center mt-0'>
                <button className="btn btn1 w-100" onClick={HandleReset}> <b> Resend Verification Email</b>
                </button>
              </div>
              <hr />
              <div className='d-flex justify-content-inline-block mb-4'>
                <p>Need Account?</p>
                <Link to="/authentication/login" className='forget-password'>Login</Link>
              </div>
            
            </div>
          </div>
        </div>
      </div>
      </div>
    // </div>

  )
}
