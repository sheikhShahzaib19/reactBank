import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
    <nav className="navbar bg-primary navbar-dark" >
    <div className="container">
      <button class= "btn btn-primary btn-nav" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
      <i class="fa-solid fa-bars text-white size"></i>
      </button>
      <Link to='/'>
      <i class="fa-solid fa-house text-white mx-2 size1"></i>
      </Link>
      
      </div>
      </nav>

      <div class="offcanvas offcanvas-start"  data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">My Bank</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
   </div>
  <div class="offcanvas-body">
   <ul className='list'>
          <li data-bs-dismiss="offcanvas">
          <i class="fa-solid fa-house me-2"></i><span>
            <Link to="/dashboard">Dashboard</Link></span>
          </li>
          <li data-bs-dismiss="offcanvas">
          <i class="fa-solid fa-user me-2"></i><span>
            <Link to="/dashboard/readaccount" >Accounts</Link></span>
          </li>
          <li data-bs-dismiss="offcanvas">
          <i class="fa-solid fa-money-bill me-1"></i><span className='ml-1'>
            <Link to="/dashboard/transactions">Transactions</Link></span>
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
    {/* </div> */}
    
    </>
  )
}
