import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Jobs.css';

const Jobs = () => {
   const [naukri, setNaukri] = useState([]);
   const { authenticated } = useContext(Context);
   const moveto = useNavigate();

   useEffect(() => {
      try {
         axios.get("http://localhost:4000/api/job/getjobs", { withCredentials: true }).then((res) => {
            setNaukri(res.data);
         });
      } catch (error) {
         console.log(error);
      }
   }, []);
   if (!authenticated) {
      moveto("/login");
   }
   return (
      <section className='job'>
         <div className="jobcontainer">
            <h1>AVAILABLE JOBS</h1>
            <div className="jobcard">
               {
                  naukri.jobs && naukri.jobs.map((e) => {
                     return (
                        <div className="cards3" key={e._id}>
                           <b><p>{e.job_title}</p></b>
                           <p style={{ opacity: '0.5' }}>{e.category}</p>
                           <p style={{ opacity: '0.7', fontWeight: 'bold' }}>{e.country}</p>
                           <Link to={`/jobinfo/${e._id}`} style={{ backgroundColor: '#98FF98', textDecoration: 'none', width: '100px', paddingLeft: '25px', color: 'black', height: '23px', paddingTop: '5px', borderRadius: '2px' }}>Job Details</Link>
                        </div>
                     );
                  })
               }
            </div>
         </div>
      </section>
   )
}

export default Jobs
