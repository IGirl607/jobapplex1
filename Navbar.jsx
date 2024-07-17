import React, { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../../main'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import './Navbar.css';
import Logo from '../../assets/joblogo-removebg-preview.png';


/*The "toast" library refers to a type of user interface (UI) component commonly used in web and mobile applications to show non-intrusive, temporary messages or notifications to users. */

const Navbar = () => {
   const {authenticated,setAuthenticated,user}=useContext(Context);
   const [display, setDisplay] = useState(false);
   const [hh,setHh]=useState(false);
   const [hj,setHj]=useState(false);
   const [ha,setHa]=useState(false);
   const[hp,setHp]=useState(false);
   const [hm,setHm]=useState(false);
   const navlinkstyling1={
      textDecoration:'none',
      color:hh ? '#1976d2' :'black',
      fontWeight: hh ? 'bold':'300'
   }
   const navlinkstyling2={
      textDecoration:'none',
      color:hj ? '#1976d2' :'black',
      fontWeight: hj ? 'bold':'200'
   }
   const navlinkstyling3={
      textDecoration:'none',
      color:ha? '#1976d2' :'black',
      fontWeight: ha ? 'bold':'300'
   }
   const navlinkstyling4={
      textDecoration:'none',
      color:hp ? '#1976d2' :'black',
      fontWeight: hp ? 'bold':'300'
   }
   const navlinkstyling5={
      textDecoration:'none',
      color:hm ? '#1976d2' :'black',
      fontWeight: hm ? 'bold':'300'
   }
   const handlelogout = async () => {
      try {
         const output = await axios.get("http://localhost:4000/api/user/logout", { withCredentials: true });
         toast.success(output.data.message);
         setAuthenticated(false);
         console.log("Logged out");
      } catch (error) {
         if (error.response && error.response.data) {
            toast.error(error.response.data.message);
         } else {
            toast.error("Error occurred while logging out.");
         }
         setAuthenticated(true);
      }
   }   
   return (
      <div>
         <nav className={ authenticated ? "shownavbar" : "hidenavbar"}>
            <div className="container">
               <div className="logo">
                  <img src={Logo} alt=''></img>
               </div>
               <div className={!display ? "menu" : "showmenu menu"}>
                  <li>
                     <Link to={"/"} style={navlinkstyling1} onMouseOver={()=>{setHh(true)}} onMouseOut={()=>{setHh(false)}} onClick={() => { setDisplay(false) }}>
                        Home
                     </Link>
                  </li>
                  <li>
                     <Link to={"/jobs/getall"} onMouseOver={()=>{setHj(true)}} onMouseOut={()=>{setHj(false)}} style={navlinkstyling2} on onClick={() => { setDisplay(false) }}>
                        JOBS
                     </Link>
                  </li>
                  <li>
                     <Link to={"/apply/me"} style={navlinkstyling3} onMouseOver={()=>{setHa(true)}} onMouseOut={()=>{setHa(false)}} onClick={() => { setDisplay(false) }}>
                        {
                           user && user.role === "Employer" ? "Recieved Applications" : "My Applications"
                        }
                     </Link>
                  </li>
                  {
                     user && user.role === "Employer" ?
                        <div className='js'>
                           <li>
                              <Link to={'/jobs/post'} style={navlinkstyling4} onMouseOver={()=>{setHp(true)}} onMouseOut={()=>{setHp(false)}} onClick={() => { setDisplay(false) }}>Post Jobs</Link>
                           </li>
                           <li>
                              <Link to={'/jobs/me'} style={navlinkstyling5} onMouseOver={()=>{setHm(true)}} onMouseOut={()=>{setHm(false)}} onClick={() => { setDisplay(false) }}>Posted Jobs</Link>
                           </li>
                        </div>
                        :
                        <></>
                  }
               </div>
               <div className="hamburger" onClick={() => { setDisplay(!display) }}>
                  <button style={{cursor:'pointer'}} onClick={handlelogout}>LOG OUT</button>
                  <DensityMediumIcon />
               </div>
            </div>
         </nav>
      </div>
   )
}

export default Navbar
