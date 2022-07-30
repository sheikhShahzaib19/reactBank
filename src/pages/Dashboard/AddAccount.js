import React, { useState, useContext, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { doc, setDoc, serverTimestamp } from "firebase/firestore/lite"
import { firestore } from 'config/firebase';
import { AuthContext } from 'context/AuthContext'

const initialState = { firstname: '', cnic: '', accountNum: '', accountType: '', branch: '', initialDep: '' }

export default function AddAccount() {
    const { user } = useContext(AuthContext)
    const [state, setState] = useState(initialState);
    const [isprocessing, setIsprocessing] = useState(false);

    let randomId = Math.random().toString(36).slice(2);
    // console.log(randomId);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })

    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        // console.log(state);
        const { firstname, cnic, accountNum, accountType, branch, initialDep } = state
        if (firstname === "") {
            window.notify('Your Name field is empty that is not acceptable.', "error")
            return;
        }
        if (cnic.length !== 13) {
            window.notify('Your CNIC number is not a CNIC Number.', "error");
            return;
        }
        if (branch > 99) {
            window.notify('You can only use 99 branches.', 'error');
            return;
        }
        if (accountNum.length !== 9) {
            window.notify('Your Account number is not a account number.', 'error');
            return;
        }
        if (accountType === "") {
            window.notify('Your have not choose your account .', 'error');
            return;
        }
        if (initialDep < 500) {
            window.notify('Your transactions is less than 500 .', 'error');
            return;
        }
        let formData = { firstname, cnic, accountNum, accountType, branch, initialDep }
        // initialDep = Number(initialDep);
        formData.dateCreated = serverTimestamp()
        formData.id = randomId;
        formData.createdBy = {
            email: user.email,
            uid: user.uid
        }
        createDocument(formData);
    }
    // useEffect(() => {
    //     console.log(typeof (Number(state.initialDep)));
    // }, [])
    const createDocument = async (formData) => {
        // console.log(formData);
        setIsprocessing(true)
        try {
            await setDoc(doc(firestore, "accounts", formData.id), formData);
            window.notify('Your Account is Created Successfully', 'success');
        }
        catch (e) {
            console.log("Error adding document: ", e);
            window.notify('Your Account is not Created', 'error');
        }
        setIsprocessing(false)
    }

    // }
    return (
        <div className="wrapper1">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-10 offset-md-1 ">
                        <div className="p-3 text-center bg-primary text-white sett">
                            <h3>Enter Account Details</h3>
                            <h6>All fields are required</h6>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row mt-5 r_set">
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
                            <div className="row mt-5 r_set">
                                <div className="col-12 col-md-6 col-lg-6">
                                    <div className="d-flex">
                                        <i class="fa-solid fa-building-columns me-2 icon"></i>
                                        <input type="number" placeholder='Branch Code (1-99)' name='branch' className='field form-control' onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 col-lg-6 setting">
                                    <div className="d-flex">
                                        <i class="fa-solid fa-user me-2 icon"></i>
                                        <input type="number" placeholder='Account Number(length should be 9)' name='accountNum' className='field form-control' onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5 r_set">
                                <div className="col-12 col-md-6 col-lg-6">
                                    <div className="d-flex">
                                        <i class="fa-solid fa-circle-info me-2 icon"></i>
                                        <select onChange={handleChange} name='accountType' className='option_bar'>
                                            <option disabled selected>
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

                            <button className='btn btn-danger mt-4 btn1'>
                                {!isprocessing ?
                                    'Create an account'
                                    : <div className="spinner-border spinner-border-sm"></div>}
                            </button>
                            {/* <>
                            {!isprocessing
                            ?
                            <button className='btn btn-danger mt-4 btn1'>Create an account</button>
                            :<div className="spinner spinner-grow"></div>
                            }</> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    )
}
