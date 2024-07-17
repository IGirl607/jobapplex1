import React, { useState } from 'react'
import './Notfound.css'
import { Link } from 'react-router-dom'

const Notfound = () => {
  const [active,setActive]=useState(false);
  const styling={
    textDecoration: 'none',
    color: active ? 'white' : 'black',
    transition: 'color 0.3s ease',
    backgroundColor: active ? 'seagreen':'white',
    padding: '6px 8px',
    border: active ? '' :'1px solid black',
    borderRadius: '4px'
  }
  return (
    <div>
         <div className="nocontent">
            <img src='https://i.pinimg.com/564x/35/6e/40/356e403878f3694ab491b406e49bdfd7.jpg' alt=''/>
            <Link to={'/'} style={styling} onMouseOver={()=>{setActive(true)}} onMouseOut={()=>{setActive(false)}}>RETURN HOME</Link>
         </div>
    </div>
  )
}

export default Notfound
