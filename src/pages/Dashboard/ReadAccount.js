import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc, writeBatch, serverTimestamp } from 'firebase/firestore/lite'
import { firestore } from 'config/firebase'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import { AuthContext } from 'context/AuthContext'

export default function ReadAccount() {

  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [item, setItem] = useState({});
  const [currentDate, setCurrentDate] = useState("")
  const [deposit, setDeposit] = useState("")
  const [withdraw, setWithdraw] = useState("")
  const [description, setDescription] = useState("")
  // const [modal,setModal]=useState([]);

  const fetchDocuments = async () => {
    setLoading(true)
    let array = [];
    try {
      const querysnapShoot = await getDocs(collection(firestore, 'accounts'))
      querysnapShoot.forEach((doc) => {
        // console.log(doc.data())
        let data = doc.data()
        data.id = doc.id;
        // console.log(data)
        array.push(data);
      })
      setProducts(array);
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

    setInterval(() => {
      setCurrentDate(dayjs().format("M/D/YYYY"));
    })

  }, [])

  const handle_modal = async (product) => {
    setItem(product);
  }

  const handleDeposit = async (e) => {

    let amountToBeDeposit = Number(deposit)

    if (amountToBeDeposit < 1) {

      toast.error("Please Enter Correct Amount ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const newAmount = Number(item.initialDep) + amountToBeDeposit

    console.log(newAmount)
    // console.log(description)
    console.log(item)

    const randomId = Math.random().toString(36).slice(2);

    let transactionData = {
      account: item,
      type: "credit",
      amount: amountToBeDeposit,
      description:description,
      id: randomId,
      createdBy: {
        email: user.email,
        uid: user.uid
      },
      dateCreated: serverTimestamp()
    }
    console.log(transactionData)
    // return

    const batch = writeBatch(firestore);

    const accountRef = doc(firestore, "accounts", item.id);
    batch.update(accountRef, { initialDep: newAmount });

    const transactionRef = doc(firestore, "transactions", randomId)
    batch.set(transactionRef, transactionData)

    // Commit the batch
    try {
      await batch.commit();

      let newDocuments = products.map((doc) => {
        if (doc.id === item.id)
          return { ...item, initialDep: newAmount }
        return doc;
      })

      setProducts(newDocuments)
      console.log("completed")
    } catch (err) {
      console.error(err)
    }
    
    setDeposit("")
  }


  const handleWithdraw = async (e) => {

    let amountToBeWithdraw = Number(withdraw)

    if (amountToBeWithdraw < 1) {

      toast.error("Please Enter Correct Amount ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const newAmount = Number(item.initialDep)-amountToBeWithdraw

    console.log(newAmount)
    // console.log(description)
    console.log(item)

    const randomId = Math.random().toString(36).slice(2);

    let transactionData = {
      account: item,
      type: "debit",
      amount: amountToBeWithdraw,
      description:description,
      id: randomId,
      createdBy: {
        email: user.email,
        uid: user.uid
      },
      dateCreated: serverTimestamp()
    }
    console.log(transactionData)
    // return

    const batch = writeBatch(firestore);

    const accountRef = doc(firestore, "accounts", item.id);
    batch.update(accountRef, { initialDep: newAmount });

    const transactionRef = doc(firestore, "transactions", randomId)
    batch.set(transactionRef, transactionData)

    // Commit the batch
    try {
      await batch.commit();

      let newDocuments = products.map((doc) => {
        if (doc.id === item.id)
          return { ...item, initialDep: newAmount }
        return doc;
      })

      setProducts(newDocuments)
      console.log("completed")
    } catch (err) {
      console.error(err)
    }
    
    setWithdraw("")
  }


  const handleDelete = async (item) => {
    console.log(item);
    await deleteDoc(doc(firestore, "accounts", item.id));
    console.log('document deleted')

    let newProducts = products.filter((newProd) => {
      return item.id !== newProd.id
    })
    setProducts(newProducts);
  }
  return (
    <>
      <div className="wrapper1">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1">
              {/* <div className="card p-3 p-sm-3 p-md-3 p-lg-4 card_set"> */}
                <div className='margin_b'>
                  <Link to="/dashboard" className="btn btn-success btn-sm my-2 button1" >
                    <i class="fa-solid fa-arrow-left-long me-2"></i>Back to dashboard</Link>
                  <Link to="/dashboard/addaccount" className="btn btn-danger btn-sm my-2 fr button1">
                    <i class="fa-solid fa-plus me-2"></i>Add new Account</Link>
                </div>
                <h3 className='text-center fb-bold'> <i class="fa-solid fa-user me-2"></i>Accounts</h3>
                <hr />
                {!loading ?
                  <>
                    {products.length > 0
                      ?
                      <div className="table-responsive table-striped">
                        <table className="table table-light ">
                          <thead>
                            <tr>
                              <th scope="col">Branch code</th>
                              <th scope="col">Account</th>
                              <th scope="col">Name</th>
                              <th scope="col">CNIC</th>
                              <th scope="col">Registered</th>
                              <th scope="col">Type</th>
                              <th scope="col">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              products.map((product, ind) => {
                                return (
                                  <tr key={ind}>
                                    <td className='pivoted'>{product.branch}</td>
                                    <td className='pivoted'>
                                      <button className='btn-detail' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handle_modal(product) }}>
                                        {product.accountNum}
                                      </button>
                                    </td>
                                    <td className='pivoted'>{product.firstname}</td>
                                    <td className='pivoted'>{product.cnic}</td>
                                    <td className='pivoted'>{currentDate}</td>
                                    <td className='pivoted'>{product.accountType}</td>
                                    <td className='pivoted'>{product.initialDep}</td>
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
              {/* </div> */}
            </div>
          </div>

        </div>
      </div>

      <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div className='margin_l'>
              <button data-bs-dismiss="modal" className="btn btn-primary btn-sm my-2 mt-3 ml-3" >
                <i class="fa-solid fa-arrow-left-long me-2"></i>View all accounts</button>
              <div className='d-flex pt-3'>
                <h5 class="modal-title" id="exampleModalLabel">Account Details</h5>
                <button className="btn btn-danger btn-sm my-2 ms-auto me-3" data-bs-dismiss="modal"
                  onClick={() => { handleDelete(item) }}
                >
                  <i class="fa-solid fa-trash me-2"></i>Delete Account</button>
              </div>
            </div>
            <div class="modal-body">
              <div className="row">
                <div className="col-6 col-md-6">
                  <p> Branch Code</p>
                </div>
                <div className="col-6 col-md-6">
                  <p>{item.branch}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6 col-md-6">
                  <p>Account#</p>
                </div>
                <div className="col-6 col-md-6">
                  <p>{item.accountNum}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6 col-md-6">
                  <p> FullName</p>
                </div>
                <div className="col-6 col-md-6">
                  {item.firstname}
                </div>
              </div>
              <div className="row">
                <div className="col-6 col-md-6">
                  <p>Registered</p>
                </div>
                <div className="col-6 col-md-6">
                  <p> {currentDate} </p>
                </div>
              </div>
              <div className="row">
                <div className="col-6 col-md-6"> <p> Type</p></div>
                <div className="col-6 col-md-6">
                  {item.accountType}
                </div>
              </div>
              <div className="row">
                <div className="col-6 col-md-6"> <p> Balance </p></div>
                <div className="col-6 col-md-6">
                  {item.initialDep}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                <i class="fa-solid fa-credit-card me-2"></i>Deposit
              </button>
              <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                <i class="fa-solid fa-angles-down me-2"></i>With draw
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit modal */}
      <div class="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">

            <div className='margin_l'>
              <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary btn-sm my-2 mt-3 ml-3"><i class="fa-solid fa-arrow-left-long me-2"></i>
                Back
              </button>
              <h5 class="modal-title mt-2" id="exampleModalLabel">Deposit Amount</h5>
            </div>
            <div class="modal-body">
              <div className="py-4">
                <div className="row">
                  <div className="col">
                    <input type="number" placeholder='Amount to Deposit' name='amount' className='field form-control' onChange={e => { setDeposit(e.target.value) }}
                    />
                  </div>
                </div>
              </div>
              <div className="py-4">
                <div className="row">
                  <div className="col">
                    <input type="text" placeholder='Description' name='description' className='field form-control' onChange={e => { setDescription(e.target.value) }} />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button className="btn btn-danger"
                onClick={handleDeposit}
                data-bs-toggle="modal" data-bs-target="#exampleModal" >
                <i class="fa-solid fa-credit-card me-2"></i>Deposit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* With drawal modal */}
      <div class="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="margin_l">
              <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary btn-sm my-2 mt-3 ml-3"><i class="fa-solid fa-arrow-left-long me-2"></i>
                Back
              </button>
              <h5 class="modal-title mt-2" id="exampleModalLabel">Withdraw Amount</h5>
            </div>
            <div class="modal-body">
              <div className="py-4">
                <div className="row">
                  <div className="col">
                    <input type="number" placeholder='Amount to Withdraw' name='amount1' className='field form-control' onChange={e=>{setWithdraw(e.target.value)}}  />
                    {/* onChange={e => { setDeposit(e.target.value) }} */}
                  </div>
                </div>
              </div>
              <div className="py-4">
                <div className="row">
                  <div className="col">
                    <input type="text" placeholder='Description' name='description1' className='field form-control' onChange={e=>{setDescription(e.target.value)}} />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleWithdraw}>
                <i class="fa-solid fa-angles-down me-2"></i>With draw
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}


// const handleDeposit = async () => {
//   setLoading(true)
//   if (deposit < 1) {

//     toast.error("Please Enter Correct Amount ", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//     setLoading(false)
//     return;
//   }
//   setDeposit("0");
//   const batch = writeBatch(firestore);
//   const withdrawRef = doc(firestore, "accounts", modal.id);
//   batch.update(withdrawRef, { catageory: "Debit" });
//   if (deposit >= Number(500)) {
//     let newDepositAmount = Number(modal.intialdeposit) + Number(deposit);
//     const docRef = await addDoc(collection(firestore, "transaction"), modal)
//     console.log(docRef)
//     // batch writes for update many transactions
//     // Get a new write batch
//     const batch = writeBatch(firestore);
//     const depositRef = doc(firestore, "accounts", modal.id);
//     await batch.update(depositRef, { "intialdeposit": newDepositAmount, catageory: "Debit" });
//     // Commit the batch
//     await batch.commit();
//     let newPriceDocuments = table.map((doc) => {
//       if (doc.id === modal.id)
//         return { ...modal, intialdeposit: newDepositAmount }
//       return doc;
//     })
//     setTable(newPriceDocuments)
//     toast.success(`Your Amount ${deposit} Has Been Deposit Successfully !`, {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//     setLoading(false)
//   }
//   else {
//     toast.error("You cannot deposit less than 500 Rs.", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//     setLoading(false)
//     return
//   }

//   setLoading(false)
//   setDeposit("0")
// }

// const handleDeposit = async () => {
//   let newAmount = Number(item.initialDep) + Number(deposit);
//   item.initialDep = newAmount;

//   // Get a new write batch
//   const batch = writeBatch(firestore);

//   // Set the value of 'NYC'
//   const nycRef =  doc(firestore, "accounts", item.id);
//   batch.set(nycRef, { initialDep: deposit });

//   // Update the population of 'SF'
//   const sfRef = doc(firestore, "accounts", item.id);
//   batch.update(sfRef, { "initialDep": deposit });

//   // Commit the batch
//   await batch.commit();
// }