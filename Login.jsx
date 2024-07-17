import React from 'react'
import { useState } from 'react'
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockIcon from '@mui/icons-material/Lock';
import Logo from '../../assets/joblogo-removebg-preview.png';
import './Login.css'
import loginimg from '../../assets/login2-removebg-preview.png';
import { useContext } from 'react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { authenticated, setAuthenticated, user, setUser } = useContext(Context);

  const [touch, setTouch] = useState(false);

  const [ltouch, setLtouch] = useState(false);

  const newstyle = {
    backgroundColor: touch ? 'rgb(4, 206, 139)' : '#C0C0C0',
    transition: 'color 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  }

  const newLstyle = {
    backgroundColor: ltouch ? 'rgb(4, 206, 139)' : '#C0C0C0',
    transition: 'color 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  if(authenticated){
    return <Navigate to={'/'}/>
  }

  return (
    <div>
      <div className="logins">
        <div className="container2">
          <div className="top">
            <img src={Logo} alt='' />
            <h3>Login To Your Account</h3>
          </div>
          <form>
            <div className="inputs">
              <label>Login as</label>
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
              <label>Email</label>
              <div className='inputinfo'>
                <input type='email' value={email} onChange={(e) => { setEmail(e.target.value) }}>
                </input>
                <div className="icons">
                  <EmailOutlinedIcon />
                </div>
              </div>
            </div>
            <div className="inputs">
              <label>Password</label>
              <div className='inputinfo'>
                <input type='password' value={password} onChange={(e) => { setPassword(e.target.value) }}>
                </input>
                <div className="icons">
                  <LockIcon />
                </div>
              </div>
            </div>
            <div className="final">
              <button onClick={handleLogin} style={newstyle} type='submit' onMouseOver={() => { setTouch(true) }} onMouseOut={() => { setTouch(false) }}>Login</button>
              <Link to={"/register"} style={{ textDecoration: 'none', width: '282px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><button style={newLstyle} onMouseOver={() => { setLtouch(true) }} onMouseOut={() => { setLtouch(false) }}>Register Now</button></Link>
            </div>
          </form>
        </div>
        <div className="banner">
          <img src={loginimg} alt=''></img>
        </div>
      </div>
    </div>
  )
}

export default Login
