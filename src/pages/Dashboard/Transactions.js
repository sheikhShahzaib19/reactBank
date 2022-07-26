import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, serverTimestamp,where,query } from 'firebase/firestore/lite'
import { firestore } from 'config/firebase'
import dayjs from 'dayjs'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { AuthContext } from 'context/AuthContext'

export default function Transactions() {
  const {user}=useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [item, setItem] = useState({});
  dateCreated: serverTimestamp();

  const fetchDocuments = async () => {
    setLoading(true)
    let array = [];
    try {
      const q = query(collection(firestore, "transactions"), where("createdBy.uid", "==", user.uid));
      const querysnapShoot = await getDocs(q);
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

  }, [])

  const handle_modal = async (product) => {
    setItem(product);
  }

  const dateFromObject = (seconds) => {
    let date = new Date(seconds * 1000)
    return dayjs(date).format("DD/MM/YYYY")
  }

  const timeFromObject = (seconds) => {
    let date = new Date(seconds * 1000)
    return dayjs(date).format("hh:mm:ss A")
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
                      <Table className="table table-light">
                        <Thead>
                          <Tr>
                            <Th>Transaction Id</Th>
                            <Th>Time</Th>
                            <Th>Date</Th>
                            <Th>Account</Th>
                            <Th>Type</Th>
                            <Th>Amount</Th>
                          </Tr>
                        </Thead>
                        <tbody>
                          {
                            transactions.map((transaction, ind) => {
                              return (
                                <Tr key={ind}>
                                  <Td>
                                    <button className='btn-detail' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handle_modal(transaction) }}>
                                      {transaction.id}
                                    </button>
                                  </Td>
                                  <Td>{timeFromObject(transaction.dateCreated.seconds)}</Td>
                                  <Td>{dateFromObject(transaction.dateCreated.seconds)}</Td>
                                  <Td>{transaction.account.accountNum}</Td>
                                  <Td>{transaction.type}</Td>
                                  <Td>{transaction.amount}</Td>
                                </Tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
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
                  <p>{item?.account?.accountNum}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-7 col-md-6">
                  <p>Account Holder Name</p>
                </div>
                <div className="col-5 col-md-6">
                  <p>{item?.account?.firstname}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6 col-md-6">
                  <p>Transaction Date</p>
                </div>
                <div className="col-6 col-md-6">
                  {dateFromObject(item?.dateCreated?.seconds)}
                </div>
              </div>
              <div className="row">
                <div className="col-6 col-md-6">
                  <p>Transaction Time</p>
                </div>
                <div className="col-6 col-md-6">
                {timeFromObject(item?.dateCreated?.seconds)}
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
