import React,{useState} from 'react'
// import { Link } from 'react-router-dom'
import { doc, setDoc,serverTimestamp } from "firebase/firestore/lite"
import { firestore } from 'config/firebase';
import { toast } from 'react-toastify'

const initialState={firstname:'',cnic:'',accountNum:'',accountType:'',branch:'',initialDep:'',dateCreated:serverTimestamp()}
 
export default function AddAccount() {

    const [state,setState]=useState(initialState);

    const handleChange = (e) => {
            setState({ ...state, [e.target.name]: e.target.value })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(state);
        const {firstname,cnic,accountNum,accountType,branch,initialDep}=state
        if (firstname === "") {
          window.notify('Your Name field is empty that is not acceptable.',"error")
            return;
          }
          if (cnic.length !== 13) {
            toast.error('Your CNIC number is not a CNIC Number .', {
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
          if (branch > 99) {
            toast.error('You can only use 99 branches.', {
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
          if (accountNum.length !== 9) {
            toast.error('Your Account number is not a account number.', {
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
          if (accountType === "") {
            toast.error('Your have not choose any currency .', {
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
          if (initialDep < 500) {
            toast.error('Your transactions is less than 500 .', {
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
    
    let randomId = Math.random().toString(36).slice(2);
          console.log(randomId);
         try {
             await setDoc(doc(firestore,"accounts",randomId),state);
             toast.success('Your document is saved in database ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
             console.log("Document written with ID: ", randomId)
           } catch (e) {

             console.log("Error adding document: ", e);
           }
        //    setState(initialState);
    }
    return (
        <div className="wrapper1">
            <div className="container">
                <div className="row">

                    <div className="col-12 col-md-10 offset-md-1 ">
                        <div className="p-2 text-center bg-primary text-white">
                            <h3>Enter Account Details Below</h3>
                            <h6>All fields are required</h6>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row mt-5">
                                <div className="col-12 col-md-6 col-lg-6">
                                    <div className="d-flex ">
                                    <i class="fa-solid fa-user me-2 icon"></i>
                                    <input type="text" placeholder='Full Name' name='firstname' className='field form-control' onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-6">
                                    <div className="d-flex setting">
                                    <i class="fa-solid fa-id-card me-2 icon"></i>
                                    <input type="number" placeholder='CNIC Number' name="cnic" className='field form-control' onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-12 col-md-6 col-lg-6">
                               <div className="d-flex">
                               <i class="fa-solid fa-building-columns me-2 icon"></i>
                               <input type="number" placeholder='Branch Code (1-99)'name='branch' className='field form-control' onChange={handleChange}/>
                               </div>
                                </div>

                                <div className="col-12 col-md-6 col-lg-6 setting">
                                    <div className="d-flex">
                                    <i class="fa-solid fa-user me-2 icon"></i>
                                    <input type="number" placeholder='Account Number(length should be 9)' name='accountNum' className='field form-control' onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-12 col-md-6 col-lg-6">
                                    <div className="d-flex">
                                    <i class="fa-solid fa-circle-info me-2 icon"></i>
                                    <select onChange={handleChange} name='accountType' className='option_bar'>
                                            <option selected>
                                                Choose Account Type
                                            </option>
                                            <option>
                                                Current
                                            </option>
                                            <option>Saving</option>
                                        </select>
                                    </div>
                                    
                                </div>
                                <div className="col-12 col-md-6 col-lg-6">
                                    <div className="d-flex setting">
                                    <i class="fa-solid fa-money-bill-1 me-2 icon"></i>
                                    <input type="number" placeholder='Initial Deposit (Minimum Rs.500)' name='initialDep' className='field form-control' onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <button className='btn btn-danger mt-4 btn1'>Create an account</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    )
}
