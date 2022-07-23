import React from 'react'

export default function Topbar() {
    const year= new Date().getFullYear()
  return (
    <footer className='bg-primary py-2'>
    <div className="container">
        <div className="row">
            <div className="col">
                <p className='text-center mb-0 text-white '>&copy; {year}, All rights reserved. </p>
            </div>
        </div>
    </div>
    </footer>
  )
}
