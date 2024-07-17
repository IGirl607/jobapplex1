import React, { useContext } from 'react'
import { useState } from 'react'
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import CreateIcon from '@mui/icons-material/Create';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import Logo from '../../assets/joblogo-removebg-preview.png';
import './Register.css'
import registerimg from '../../assets/register-removebg-preview.png';

/*When an event is triggered on a DOM element (such as clicking a link, submitting a form, or pressing a key), the browser typically performs a default action associated with that event. For example:

Clicking on a link navigates to the URL specified in the href attribute.
Submitting a form sends the form data to the server.
In some cases, you might want to prevent this default behavior from occurring. This is where preventDefault() comes into play.*/

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState("");

  const { authenticated, setAuthenticated, user, setUser } = useContext(Context);

  const [touch,setTouch]=useState(false);

  const [ltouch,setLtouch]=useState(false);

  const newstyle={
    backgroundColor: touch ? 'rgb(4, 206, 139)':'#C0C0C0',
    transition: 'color 0.3s ease',
    border:'none',
    cursor:'pointer',
    fontWeight:'bold',
  }

  const newLstyle={
    backgroundColor: ltouch ? 'rgb(4, 206, 139)':'#C0C0C0',
    transition: 'color 0.3s ease',
    border:'none',
    cursor:'pointer',
    fontWeight:'bold',
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/register",
        { role,
          name,
          email,
          telephone,
          password
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setTelephone("");
      setRole("");
      setAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  if(authenticated)
  {
      return <Navigate to={"/"}/>
  }
  return (
    <div>
      <div className="regis">
        <div className="container2">
          <div className="top">
            <img src={Logo} alt='' />
            <p>Create a new Account</p>
          </div>
          <form>
            <div className="inputs">
              <label>Register as</label>
              <div className='inputinfo'>
                <select value={role} onChange={(e) => { setRole(e.target.value) }}>
                  <option value="Select role">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <div className="iconssel">
                  <PersonIcon />
                </div>
              </div>
            </div>
            <div className="inputs">
              <label>Name</label>
              <div className='inputinfo'>
                <input type='text' value={name} placeholder='Name' onChange={(e) => { setName(e.target.value) }}>
                </input>
                <div className="icons">
                  <CreateIcon />
                </div>
              </div>
            </div>
            <div className="inputs">
              <label>Email</label>
              <div className='inputinfo'>
                <input type='email' value={email} placeholder='Email' onChange={(e) => { setEmail(e.target.value) }}>
                </input>
                <div className="icons">
                  <EmailOutlinedIcon />
                </div>
              </div>
            </div>
            <div className="inputs">
              <label>Contact No</label>
              <div className='inputinfo'>
                <input type='number' value={telephone} placeholder='Phone_no' onChange={(e) => { setTelephone(e.target.value) }}>
                </input>
                <div className="icons">
                  <PhoneIcon />
                </div>
              </div>
            </div>
            <div className="inputs">
              <label>Password</label>
              <div className='inputinfo'>
                <input type='password' value={password} placeholder='Password' onChange={(e) => { setPassword(e.target.value) }}>
                </input>
                <div className="icons">
                  <LockIcon />
                </div>
              </div>
            </div>
            <div className="final">
              <button onClick={handleRegister} style={newstyle} type='submit' onMouseOver={()=>{setTouch(true)}} onMouseOut={()=>{setTouch(false)}}>Register</button>
              <Link to={"/login"} style={{textDecoration:'none',width:'282px',height:'28px', display:'flex', alignItems:'center', justifyContent:'center'}}><button style={newLstyle} onMouseOver={()=>{setLtouch(true)}} onMouseOut={()=>{setLtouch(false)}}>Login Now</button></Link>
            </div>
          </form>
        </div>
        <div className="banner">
          <img src={registerimg} alt=''></img>
        </div>
      </div>
    </div>
  )
}

export default Register
