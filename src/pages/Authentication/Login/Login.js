import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'config/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from 'context/AuthContext';
import { firestore } from 'config/firebase';

const initialState = { email: '', password: '' }

export default function Login() {

  const navigate = useNavigate();
  const [state, setstate] = useState(initialState);
  const [isProcessing, setisProcessing] = useState(false)
  const [isPasswordShow, setisPasswordShow] = useState(false)
  const {authentication,dispatch}=useContext(AuthContext)
  const {isAuthenticated}=authentication;

  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { email, password } = state;
    
    if(email === ''){
      window.notify('Please enter your email','error')
      return
    }
    if(password === ''){
      window.notify('Please enter your password','error')
      return
    }
    setisProcessing(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success('You Have Successfully Logged In ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("User logged in");
        // Signed in 
        let user = userCredential.user;
        console.log(user)
        // setstate(initialState);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Please enter information ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setisProcessing(false)
        // ..
      })
    // try {
    //   let { email } = state;
    //   const docRef = await addDoc(collection(firestore, "user"), {
    //     email: email,
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  }

  return (
    <>
      <div className="auth">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3">
              <div className="card p-3 p-sm-3 p-md-3 p-lg-4">
                <h2 className='text-center fb-bold m-3'>Login Details</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col">
                      <label className='mb-2'>Email</label>
                      <input type="email" placeholder='Enter your email' value={state.email} className='form-control' name='email' onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label className='mb-2'>Password</label>
                      
                        <div class="input-group mb-3">
                         <input  type={isPasswordShow ? "text" : "password"} placeholder='Enter your password' name='password' value={state.password} className='form-control' onChange={handleChange}/>
                          <span class="input-group-text" onClick={() => { setisPasswordShow(!isPasswordShow) }}><i className={`fa-solid fa-eye${isPasswordShow ? "" : "-slash"}`}></i></span>
                       </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">

                      <button className='btn w-100 btn1' disabled={isProcessing}>

                        {!isProcessing ?
                          <b>Login</b>
                          : <div className='spinner-grow spinner-grow-sm'></div>
                        }
                      </button>

                    </div>
                  </div>
                </form>
                {/* <div className="row">
                  <div className="col">
                    <p style={{fontSize:'20px'}} className='text-center'>
                  <i class="fa-brands fa-google me-4"></i>
                  <i class="fa-brands fa-facebook-f "></i>
                    </p>
                  </div>
                </div> */}
                <div className="row">
                  <div className="col">
                    <div className="d-flex">
                      <p className=" mb-0">Need account <Link to='/authentication/register'>Register</Link></p>
                      <p className='mb-2 ms-auto'>
                        <Link to="/authentication/forgotpassword">Forget Password?</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
