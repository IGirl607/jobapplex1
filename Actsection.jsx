import React from 'react'
import Jobpic from '../../assets/jobpic-removebg-preview.png';
import './Artsec.css'
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';

const Actsection = () => {
  const infos = [{
    id: 1,
    title: "1,23,441",
    subtitle: "Live Jobs",
    icon: <WorkIcon />
  }, {
    id: 2,
    title: "91220",
    subtitle: "Companies",
    icon: <BusinessIcon />
  }, {
    id: 3,
    title: "2,34,300",
    subtitle: "Job Seekers",
    icon: <PeopleIcon />
  }, {
    id: 4,
    title: "1,03,771",
    subtitle: "Employers",
    icon: <PersonIcon />
  }]
  return (
    <>
      <div className='act'>
        <div className="container3">
          <div className="heading">
            <h1>Your Career Starts Here</h1>
            <h1>Unleash Your Potential</h1>
            <h1>Browse Our Job Openings</h1>
            <p>Welcome to <b>JobKhojo</b>, where your career journey begins. Explore thousands of job opportunities tailored to your skills and ambitions. Whether you're starting out or advancing your career, find your next role and apply with confidence. Join us and unlock new possibilities today.</p>
          </div>
        </div>
        <div className="jobpic">
          <img src={Jobpic} alt='' />
        </div>
      </div>
      <div className="info">
        {
          infos.map(e => {
            return (
              <div className="cards" key={e.id}>
                <div className="pics">{e.icon}</div>
                <div className="detail">
                  <b><p>{e.title}</p></b>
                  <p>{e.subtitle}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </>

  )
}

export default Actsection
