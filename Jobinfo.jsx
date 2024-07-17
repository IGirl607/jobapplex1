import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { Context } from '../../main';
import axios from 'axios';
import './jobinfo.css';
const Jobinfo = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const moveto = useNavigate();
  const [mouse,setMouse]=useState(false);

  const { authenticated, user } = useContext(Context);
  const styling = {
    backgroundColor: !mouse ? '#98FF98' :'#ADD8E6',
    textDecoration: 'none',
    width: '100px',
    paddingLeft: '25px',
    color: 'black',
    height: '23px',
    paddingTop: '5px',
    borderRadius: '2px',
    marginBottom:'10px'
  }

  useEffect(() => {
    try {
      axios.get(`http://localhost:4000/api/job/${id}`, { withCredentials: true }).then((res) => {
        setJob(res.data.job);
      })
    } catch (error) {
      console.log(err.response.data.error);
    }
  }, []);

  if (!authenticated) {
    moveto("/login");
  }
  return (
    <div className='jobinfos'>
      <div className="jobdata">
        <h3>JOB DETAILS</h3>
        <div className="banner">
          <p><b>Title:</b> <span>{job.job_title}</span></p>
          <p><b>Category:</b> <span>{job.category}</span></p>
          <p><b>Country:</b> <span>{job.country}</span></p>
          <p><b>City:</b> <span>{job.city}</span></p>
          <p><b>Location:</b> <span>{job.location}</span></p>
          <p><b>Description:</b> <span>{job.job_description}</span></p>
          <p><b>Job PostedOn:</b> <span>{job.job_posted_on}</span></p>
          <p><b>Salary:</b> {job.fixed_salary ? (<span>{job.fixed_salary}</span>) : (<span>{job.salary_from}-{job.salary_to}</span>)}</p>
          <p>{user && user.role === "Employer" ? <></> : <Link onMouseOver={()=>{setMouse(true)}} onMouseOut={()=>{setMouse(false)}} style={styling} to={`/apply/${id}`}>Apply Now</Link>}</p>
        </div>
      </div>
    </div>
  )
}

export default Jobinfo
