import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, serverTimestamp } from 'firebase/firestore/lite'
import { firestore } from 'config/firebase'
import dayjs from 'dayjs'

export default function Transactions() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [item, setItem] = useState({});
  const [account, setAccount] = useState({});
  const [currentDate, setCurrentDate] = useState("")
  dateCreated: serverTimestamp();
  // const [currentTime, setCurrentTime] = useState("")

//   const dateCreated1 = new Date(dateCreated*1000);

// const dateCreated=dateCreated1
  const fetchDocuments = async () => {
    setLoading(true)
    let array = [];
    try {
      const querysnapShoot = await getDocs(collection(firestore, 'transactions'))
      querysnapShoot.forEach((doc) => {
        // console.log(doc.data())
        let data = doc.data()
        data.id = doc.id;
        // console.log(data)
        array.push(data);
        console.log(array.dateCreated)
      })
      setTransactions(array);
    }
    catch {
      <>
        <h5>You have no any account yet now</h5>
        <Link to="/dashboard/addaccount" className="btn btn-primary my-2">Add new Account</Link>
      </>
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchDocuments();

    // setInterval(() => {
    //   setCurrentDate(dayjs().format("M/D/YYYY"));
    // })
  }, [])

  const handle_modal = async (product) => {
    setItem(product);
  }
  return (
    <>
      <div className="wrapper1">
        <div className="container">
          <div className="row mt-5">
            <div className="col-12 col-md-10 offset-md-1">
              <div className="card p-3 p-sm-3 p-md-3 p-lg-4 card_set mt-5 mb-3">
                <div className='margin_b'>
                  <Link to="/dashboard" className="btn btn-success btn-sm my-2 button1" >
                    <i class="fa-solid fa-arrow-left-long me-2"></i>Back to dashboard</Link>
                </div>
                <h3 className='text-center fb-bold'> <i class="fa-solid fa-user me-2"></i>Transactions</h3>
                <hr />
                {!loading ?
                  <>
                    {transactions.length > 0
                      ?
                      <div className="table-responsive table-striped">
                        <table className="table table-light">
                          <thead>
                            <tr>
                              <th>Transaction Id</th>
                              <th>Time</th>
                              <th>Date</th>
                              <th>Account</th>
                              <th>Type</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              transactions.map((transaction, ind) => {
                                return (
                                  <tr key={ind}>

                                    <td>
                                      <button className='btn-detail' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handle_modal(transaction) }}>
                                        {transaction.id}
                                      </button>
                                    </td>
                                    {/* <td>{transaction.dateCreated.date()}</td> */} 
                                     <td></td>
                                    <td></td>
                                    <td>{transaction.account.accountNum}</td>
                                    <td>{transaction.type}</td>
                                    <td>{transaction.amount}</td>

                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                      :
                      <div className="text-center">
                        There is no data that is available to show.
                      </div>
                    }
                  </>
                  :
                  <div className='w-100 d-flex align-items-center justify-content-center'>
                    <div className="spinner-grow "></div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div className='margin_l'>
              <button data-bs-dismiss="modal" className="btn btn-primary btn-sm my-2 mt-3 ml-3" >
                <i class="fa-solid fa-arrow-left-long me-2"></i>View all transaction</button>
              <div className='text-center pt-3'>
                <h5 class="modal-title" id="exampleModalLabel">Transaction Details of {item.id}</h5>
              </div>
            </div>
            <div class="modal-body">
              <div className="row">
                <div className="col-6 col-md-6">
                  <p>Account#</p>
                </div>
                <div className="col-6 col-md-6">
                  {/* <p>{item.account.accountNum}</p> */}
                </div>
              </div>
              <div className="row">
                <div className="col-7 col-md-6">
                  <p>Account Holder Name</p>
                </div>
                <div className="col-5 col-md-6">
                  {/* <p>{item.account.firstname}</p> */}
                </div>
              </div>
              <div className="row">
                <div className="col-6 col-md-6">
                  <p>Transaction Date</p>
                </div>
                <div className="col-6 col-md-6">
                  {item.firstname}
                </div>
              </div>
              <div className="row">
                <div className="col-6 col-md-6">
                  <p>Transaction Time</p>
                </div>
                <div className="col-6 col-md-6">

                </div>
              </div>
              <div className="row">
                <div className="col-6 col-md-6"> <p>Transaction Type</p></div>
                <div className="col-6 col-md-6">
                  {item.type}
                </div>
              </div>
              <div className="row">
                <div className="col-6 col-md-6"> <p> Amount </p></div>
                <div className="col-6 col-md-6">
                  {item.amount}
                </div>
              </div>
              <div className="row">
                <div className="col-6 col-md-6"> <p> Description </p></div>
                <div className="col-6 col-md-6">
                  {item.description}
                </div>
              </div>
            </div>
            {/* <div class="modal-footer">
              <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                <i class="fa-solid fa-credit-card me-2"></i>Deposit
              </button>
              <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                <i class="fa-solid fa-angles-down me-2"></i>With draw
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
