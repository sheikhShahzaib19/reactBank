import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { firestore } from "../../config/firebase"
import { AuthContext } from 'context/AuthContext';

export default function Home() {

  const { user } = useContext(AuthContext);
  const [account, setAccount] = useState(0);
  const [transaction, setTransaction] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amount1, setAmount1] = useState(0);

  const fetchData = async () => {
    let index = 0;
    
    const q = query(collection(firestore, "accounts"), where("createdBy.uid", "==", user.uid));
    const querysnapShoot = await getDocs(q);
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
    let newamount = 0;
    let newamount1 = 0;
    // collection(firestore, 'transactions')
    const q = query(collection(firestore, "transactions"), where("createdBy.uid", "==", user.uid));
    const querysnapShoot = await getDocs(q);
    querysnapShoot.forEach((doc) => {
      let data = doc.data()
      // console.log(data);
      data.id = doc.id;
      index = index + 1;
      if (data.type === 'credit') {
        newamount = newamount + data.amount;
      }
      if (data.type === 'debit') {
        newamount1 = newamount1 + data.amount;
      }
    })
    setTransaction(index);
    setAmount(newamount);
    setAmount1(newamount1);
  }
  useEffect(() => {
    fetchData();
    fetchTransaction();
  }, [])

  return (
    <>
      <div className="wrapper1">
        <div className="container">
          <div className="row pb-4 pb-lg-0">
            <div className="col-12 col-md-5 offset-md-1">
              <div className="card p-3 p-sm-3 p-lg-4 card_set screen">
                <h5 className='text-center'> <i class="fa-solid fa-user me-2"></i>Accounts</h5>
                <hr />
                <div className=" text-center">
                  <Link to="/dashboard/addaccount" className="btn btn-primary btn-sm my-2 me-2" >
                    <i class="fa-solid fa-plus me-2"></i>Add new Account</Link>
                  <Link to="/dashboard/readaccount" className="btn btn-danger btn-sm my-2 " >
                    <i class="fa-solid fa-eye me-2"></i>View all accounts</Link>
                </div>
                <hr />

                <div className="text-center mb-4">
                  <h4 className='mb-0'>{account}</h4>
                  <h4 className='mt-0'>Accounts</h4>
                </div>

              </div>
            </div>
            <div className="col-12 col-md-5 ">
              <div className="card p-3 p-sm-3 p-md-3 p-lg-3 card_set screen1">
                <h5 className='text-center'><i class="fa-solid fa-money-bill me-2"></i>Transactions</h5>
                <hr />
                <div className="text-center">
                  <Link to="/dashboard/transactions" className="btn btn-danger btn-sm my-2 " >
                    <i className="fa-solid fa-eye me-2"></i>View all transactions</Link>
                </div>
                <hr />
                <>
                  <div className="text-center">
                    <h4 className='mb-0'>{transaction}</h4>
                    <h4 className='mt-0'>Transactions</h4>
                  </div>
                </>
                <div className="row">
                  <div className="col-6 col-md-6">
                    <p class="m-0"><span class="debitAndCredit">Total Credits Rs: <span className="text-success">{amount}</span></span></p>
                  </div>
                  <div className="col-6 col-md-6">
                    <p className="ms-5 ms-lg-5"><span class="debitAndCredit">Total Debits Rs: <span className="text-danger">{amount1}</span></span></p>
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
