import { AuthContext } from 'context/AuthContext'
import { signOut } from 'firebase/auth';
import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { auth } from 'config/firebase';
import p1 from 'assets/abc.jpg'

export default function Navbar() {

  const { authentication, dispatch } = useContext(AuthContext);
  const { isAuthenticated } = authentication

  const handleLogout = () => {

    signOut(auth)
      .then(() => {
        dispatch({ type: "Logout" })
      })
      .catch(e => {
        console.error(e);
      })
    alert('Logged out');
  }
  return (
    <div className="wrapper">
      <img src={p1} alt="bank image" className='img-fluid image'/>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">My Bank</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/about'>About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/contact'>Contact</Link>
              </li>
            </ul>
            <div className="d-flex">
              {!isAuthenticated
                ? <Link to='/authentication/login' className="btn btn-success">Login</Link>
                :
                <>
                  <Link to='./dashboard' className="btn btn-success btn-sm me-2">Dashboard</Link>
                  <button className='btn btn-danger btn-sm' onClick={handleLogout}>Logout</button>
                </>
              }

            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
