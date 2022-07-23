import React,{useState,useEffect} from 'react'
import dayjs from 'dayjs'

export default function Topbar() {
  const [currentTime,setCurrentTime]=useState("")

 useEffect(()=>{
  // console.log('executed')
     setInterval(()=>{
      setCurrentTime(dayjs().format("dddd,MMMM,D,YYYY,hh:mm:ss A" ));
     })
},[]);
  return (
       <div className="bg-primary py-1">
        <div className="container">
        <div className="row">
          <div className="col">
              <p className='text-white text-center mb-0'>{currentTime}</p>
          </div>
          </div>
        </div>
       </div>  
  )
}
