import React, { useState,useContext } from 'react'
import {Link} from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,firestore } from 'config/firebase';
import { doc,setDoc } from 'firebase/firestore/lite';
import { AuthContext } from 'context/AuthContext';

const initialState = { email:'', password:''}

export default function Register() {
 
  const {dispatch}= useContext(AuthContext);
  const [ state, setState ] = useState(initialState);
  const [isProcessing, setisProcessing] = useState(false)

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(state)

    let {email,password} = state;
    setisProcessing(true);
   
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      // Signed in 
      let user = userCredential.user;
      setDocument(user);
      console.log(user)
      console.log('user registered succesfully')
      // ...
    })
    .catch(error => {
      console.error(error);
      setisProcessing(false)
    })
  }
  const setDocument= async(user)=>{
    try{
      await setDoc(doc(firestore, "users", user.uid), {
        Firstname: "",
        Lastname: "",
        user: user.uid,
      });
      console.log('user document created at firestore');
      dispatch({type:'Login'})
    }
    catch (e){
     console.error(e);
    }
    setisProcessing(false)
  };
  return (
    <>
      <div className="auth">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3">
              <div className="card p-3 p-sm-3 p-md-3 p-lg-4">
                <h2 className='text-center fb-bold m-3'>Register Details</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col">
                      <label className='mb-2'>Email</label>
                      <input type="email" placeholder='Enter your email' className='form-control' name='email' onChange={handleChange}
                      />

                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="">Password</label>
                      <input type="password" placeholder='Enter your password' name='password' className='form-control' onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">

                      <button className='btn btn1 w-100' disabled={isProcessing}> {!isProcessing ?
                        'Register'
                        : <div className='spinner-grow spinner-grow-sm'></div>
                      }
                      </button>

                    </div>
                  </div>
                  </form>
                  <div className="row">
                    <div className="col">
                      <p className="mb-0 text-center">Already have an account ? <Link to='/authentication/login'>Login</Link></p>
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
