import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Resume from './Resume';
import './Myapply.css'

const Myapply = () => {
  const [applications, setApplications] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [model, setModel] = useState(false);
  const { authenticated, user } = useContext(Context);
  const moveto = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios.get("http://localhost:4000/api/application/employerget", { withCredentials: true }).then((res) => {
          setApplications(res.data.allapplies);
        });
      }
      else {
        axios.get("http://localhost:4000/api/application/jobseekerget", { withCredentials: true }).then((res) => {
          setApplications(res.data.myapply);
        })
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }, [authenticated]);

  if (!authenticated) {
    moveto("/login");
  }

  const deleteapply = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/application/deleteapply/${id}`, { withCredentials: true }).then((res) => {
        toast.success(res.data.message);
        setApplications((oldapplies) => {
          return oldapplies.filter(myapply => myapply._id !== id);
        });
      });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  const open = (imageUrl) => {
    setImageUrl(imageUrl);
    setModel(true);
  }

  const close = () => {
    setModel(false);
  }
  return (
    <div className='myapply_area'>
      {
        user && user.role === "Job Seeker" ? (
          <div className="myapply_block">
            <h1>MY APPLICATIONS</h1>
            {
              !applications ? ( // Check if applications is undefined
                <h4>Loading...</h4>
              ) : applications.length === 0 ? ( // Check if applications is an empty array
                <h4>NO APPLICATIONS FOUND</h4>
              ) : (
                applications.map(e => {
                  return <JobSeekerCard element={e} key={e._id} deleteapply={deleteapply} open={open} />
                })
              )
            }
          </div>
        ) : (
          <div className="myapply_block">
            <h1>APPLICATIONS FROM JOB SEEKERS</h1>
            {
              !applications ? ( // Check if applications is undefined
                <h4>Loading...</h4>
              ) : applications.length === 0 ? ( // Check if applications is an empty array
                <h4 style={{color:'red',fontWeight:'bold',display:'flex',justifyContent:'center',marginTop:'20px'}}>NO APPLICATIONS FOUND!!</h4>
              ) : (
                applications.map(e => (
                  <EmployerCard element={e} key={e._id} open={open} />
                ))
              )
            }
          </div>
        )
      }
      {
        model && (
          <Resume imageUrl={imageUrl} onClose={close} />
        )
      }
    </div>
  )
}

export default Myapply;

const JobSeekerCard = ({ element, deleteapply, open }) => {
  return (
    <>
      <div className="jobseeker_card">
        <div className="jobseeker_info">
          <p>
            <span>Name: </span>
            {element.name}
          </p>
          <p>
            <span>Email: </span>
            {element.email}
          </p>
          <p>
            <span>Contact no: </span>
            {element.phone}
          </p>
          <p>
            <span>Address: </span>
            {element.address}
          </p>
          <p>
            <span>Cover Letter: </span>
            {element.cover_letter}
          </p>
        </div>
        <div className="resumeinfo">
          <img src={element.resume.url} alt='' onClick={() => { open(element.resume.url) }} />
        </div>
        <div className="btnfinal">
          <button onClick={() => { deleteapply(element._id) }}>Delete Application</button>
        </div>
      </div>
    </>
  )
}

const EmployerCard = ({ element, open }) => {
  return (
    <>
      <div className="jobseeker_card">
        <div className="jobseeker_info">
          <p>
            <span>Name: </span>
            {element.name}
          </p>
          <p>
            <span>Email: </span>
            {element.email}
          </p>
          <p>
            <span>Contact no: </span>
            {element.phone}
          </p>
          <p>
            <span>Address: </span>
            {element.address}
          </p>
          <p>
            <span>Cover Letter: </span>
            {element.cover_letter}
          </p>
        </div>
        <div className="resumeinfo">
          <img src={element.resume.url} alt='' onClick={() => { open(element.resume.url) }} />
        </div>
      </div>
    </>
  )
}
