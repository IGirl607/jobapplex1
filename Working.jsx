import React from 'react'
import FindInPageIcon from '@mui/icons-material/FindInPage';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import './Working.css';
const Working = () => {
  return (
    <div className='working'>
      <div className="container4">
        <h3>How JobKhojo Works</h3>
        <div className="hoarding">
            <div className="card c1">
              <i><PersonAddIcon/></i>
              <b><p>Create Account</p></b>
              <p>Ready to take the next step in your career? Begin your journey with us by creating your account below. It's quick, easy, and the first step towards unlocking exclusive job opportunities and updates tailored just for you!</p>
            </div>
            <div className="card c2">
              <i><FindInPageIcon/></i>
              <b><p>Find/Post a job</p></b>
              <p>Explore career opportunities or post your job vacancy with us today! Start your search or begin recruiting the perfect candidate now.</p>
            </div>
            <div className="card c3">
              <i><SendIcon/></i>
              <b><p>References</p></b>
              <p>Ready to take the next step in your career? Begin your journey with us by creating your account below. It's quick, easy, and the first step towards unlocking exclusive job opportunities and updates tailored just for you!</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Working
