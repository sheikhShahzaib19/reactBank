import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
// import Todos from './Todos'
import Header from './components/Header'
import Footer from './components/Footer'
import AddAccount from './AddAccount'
import ReadAccount from './ReadAccount'
import Transactions from './Transactions'

export default function index() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='addaccount' element={<AddAccount/>} />
            <Route path='readaccount' element={<ReadAccount/>} />
            <Route path='transactions' element={<Transactions/>} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  )
}
