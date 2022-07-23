import React, { useState, useEffect } from 'react'
// import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
// import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore/lite';
import { firestore } from "../../config/firebase"

export default function Home() {
  // const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(0);
  const [transaction, setTransaction]=useState(0);
  const [amount, setAmount]=useState(0);

  const fetchData = async () => {
    let index = 0;

    const querysnapShoot = await getDocs(collection(firestore, 'accounts'))
    querysnapShoot.forEach((doc) => {
      let data = doc.data()
      // console.log(data);
      data.id = doc.id;
      index = index + 1;
    })
    setAccount(index);
  }
  const fetchTransaction = async () => {
    let index = 0;
    let newamount=amount;
    
    const querysnapShoot = await getDocs(collection(firestore, 'transactions'))
    querysnapShoot.forEach((doc) => {
      let data = doc.data()
      // console.log(data);
      data.id = doc.id;
      index = index + 1;
      if(data.type==='credit'){
         newamount=newamount+amount;
         console.log(newamount);
      }
    })
    setTransaction(index);
    setAmount(newamount);

  }
  useEffect(() => {
    fetchData();
    fetchTransaction();
  }, [])

  return (
    <>
    <div className="wrapper1">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 offset-md-1">
            <div className="card p-3 p-sm-3 p-md-3 p-lg-4 card_set screen">
              <h5 className='text-center fb-bold'> <i class="fa-solid fa-user me-2"></i>Accounts</h5>
              <hr />
              <div className=" text-center">
                <Link to="/dashboard/addaccount" className="btn btn-primary btn-sm my-2 me-2" >
                  <i class="fa-solid fa-plus me-2"></i>Add new Account</Link>
                <Link to="/dashboard/readaccount" className="btn btn-danger btn-sm my-2 " >
                  <i class="fa-solid fa-eye me-2"></i>View all accounts</Link>
              </div>
              <hr />
              
              <div className="text-center mt-3">
                <h4>{account}</h4>
                <h4 className='mt-0'>Accounts</h4>
              </div>
             
            </div>
          </div>
          <div className="col-12 col-md-5 ">
            <div className="card p-3 p-sm-3 p-md-3 p-lg-4 card_set screen1">
              <h5 className='text-center fb-bold'><i class="fa-solid fa-money-bill me-2"></i>Transactions</h5>
              <hr />
              <div className="text-center">
                <Link to="/dashboard/transactions" className="btn btn-danger btn-sm my-2 " >
                  <i className="fa-solid fa-eye me-2"></i>View all transactions</Link>
              </div>
              <hr />
              <>
              <div className="text-center mt-3">
                <h4>{transaction}</h4>
                <h4 className='mt-0'>Transactions</h4>
              </div>
              </>
              <div className="d-flex">
              <button className="btn btn-primary">{amount}</button>
              <button className="btn btn-primary"></button>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>

{/* <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
  Link with href
</a> */}

{/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
  Button with data-bs-target
</button> */}

{/* <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div>
      Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
    </div>
    <div class="dropdown mt-3">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
        Dropdown button
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div>
  </div>
</div> */}

          {/* <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link  to="/dashboard/readaccount">Account</Link>
          </li>
          <li>
            <Link  to="/dashboard/transactions">transaction</Link>
          </li>
        </ul> */}
    
    
    {/* <div class="dropdown mt-3">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
        Dropdown button
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div> */}
</>
  )
}
