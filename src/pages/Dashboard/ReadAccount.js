import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc, writeBatch, serverTimestamp,where,query } from 'firebase/firestore/lite'
import { firestore } from 'config/firebase'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import { AuthContext } from 'context/AuthContext'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

export default function ReadAccount() {

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [item, setItem] = useState({});
  const [deposit, setDeposit] = useState("")
  const [withdraw, setWithdraw] = useState("")
  const [description, setDescription] = useState("")

  const fetchDocuments = async () => {
    setLoading(true)
    let array = [];
    try {

      const q = query(collection(firestore, "accounts"), where("createdBy.uid", "==", user.uid));
      const querysnapShoot = await getDocs(q)
      querysnapShoot.forEach((doc) => {
        // console.log(doc.data())
        let data = doc.data()
        data.id = doc.id;
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
  }, [])

  const handle_modal = async (product) => {
    setItem(product);
  }
  const dateFromObject = (seconds) => {
    let date = new Date(seconds * 1000)
    return dayjs(date).format("DD/MM/YYYY")
  }
  const handleDeposit = async (e) => {

    let amountToBeDeposit = Number(deposit)

    if (amountToBeDeposit < 1) {

      window.notify("Please Enter Correct Amount ",'error')
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
                      <div className="card p-3 p-md-4 p-lg-3">
                        <Table className="table table-light ">
                          <Thead>
                            <Tr>
                              <Th>Branch code</Th>
                              <Th>Account</Th>
                              <Th>Name</Th>
                              <Th>CNIC</Th>
                              <Th>Registered</Th>
                              <Th>Type</Th>
                              <Th>Balance</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {
                              products.map((product, ind) => {
                                return (
                                  <Tr key={ind}>
                                    <Td>{product.branch}</Td>
                                    <Td>
                                      <button className='btn-detail' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handle_modal(product) }}>
                                        {product.accountNum}
                                      </button>
                                    </Td>
                                    <Td>{product.firstname}</Td>
                                    <Td>{product.cnic}</Td>
                                    <Td>{dateFromObject(product.dateCreated.seconds)}</Td>
                                    
                                    <Td>{product.accountType}</Td>
                                    <Td>{product.initialDep}</Td>
                                  </Tr>
                                )
                              })
                            }
                          </Tbody>
                        </Table>
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
                  <p> {dateFromObject(item?.dateCreated?.seconds)} </p>
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
