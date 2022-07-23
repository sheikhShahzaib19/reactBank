import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark" >
    <div className="container">
      <h1 className="navbar-brand mt-1 logo">My Bank</h1>
      <button class= "btn btn-primary d-none btn-nav" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
      <i class="fa-solid fa-bars text-white"></i>
      </button>
      <div class="offcanvas offcanvas-start"  data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
   <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/readaccount">Account</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/transactions">transaction</Link>
          </li>
    </ul>
    </div>
    </div>



      {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button> */}
      {/* <div className="collapse navbar-collapse" id="offcanvasExample">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/readaccount">Account</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/transactions">transaction</Link>
          </li>
        </ul>
      </div> */}
    </div>
  </nav>
    </>
  )
}
