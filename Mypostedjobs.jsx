import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCheck } from "react-icons/fa";
import CloseIcon from '@mui/icons-material/Close';
import './Mypostedjobs.css';
import CheckIcon from '@mui/icons-material/Check';

const Mypostedjobs = () => {
  const [postedjobs, setPostedjobs] = useState([]);
  const [edit, setEdit] = useState(null);

  const { authenticated, user } = useContext(Context);

  const moveto = useNavigate();

  useEffect(() => {
    const getmyjobs = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/job/showmyjob", { withCredentials: true });
        setPostedjobs(data.myjob);
      } catch (error) {
        toast.error(error.response.data.error);
        setPostedjobs([]);
      }
    };
    getmyjobs();
  }, []);

  if (!authenticated || (user && user.role != "Employer")) {
    moveto("/");
  }

  const enableedit = (x) => {
    setEdit(x);
  }
  const disableedit = () => {
    setEdit(null);
  }

  const editing = async (x) => {
    const updated_job = postedjobs.find(job => job._id === x);
    await axios.put(`http://localhost:4000/api/job/update/${x}`, updated_job, {
      withCredentials: true
    }).then((res) => {
      toast.success(res.data.message);
      setEdit(null);
    }).catch((err) => {
      toast.error(err.response.data.error);
    });
  }

  const deleting = async (x) => {
    await axios.delete(`http://localhost:4000/api/job/delete/${x}`, { withCredentials: true }).then((res) => {
      toast.success(res.data.message);
      setPostedjobs(oldjobs => oldjobs.filter(job => job._id != x));
    }).catch((err) => {
      toast.error(err.response.data.error);
    })
  }

  const inputchange = (x, field, value) => {
    setPostedjobs((oldjobs) => {
      return oldjobs.map((job) => {
        return job._id === x ? { ...job, [field]: value } : job;
      });
    });
  }
  return (
    <div className='myjobs'>
      <div className="myjobs_block">
        <h3>YOUR POSTED JOBS</h3>
        {
          postedjobs.length > 0 ? (
            <>
              <div className="postedjobs_banner">
                {
                  postedjobs.map((e) => {
                    return (
                      <div className="postedjobs_card" key={e._id}>
                        <div className="content">
                          <div className="short_fields">
                            <div>
                              <span>Title: </span>
                              <input type='text' disabled={edit !== e._id ? true : false} value={e.job_title} onChange={(element) => inputchange(e._id, "job_title", element.target.value)} />
                            </div>
                            <div>
                              <span>Country: </span>
                              <input type='text' disabled={edit !== e._id ? true : false} value={e.country} onChange={(element) => inputchange(e._id, "country", element.target.value)} />
                            </div>
                            <div>
                              <span>City: </span>
                              <input type='text' disabled={edit !== e._id ? true : false} value={e.city} onChange={(element) => inputchange(e._id, "city", element.target.value)} />
                            </div>
                            <div>
                              <span>Category: </span>
                              <select value={e.category} onChange={(element) => inputchange(e._id, "category", element.target.value)} disabled={edit !== e._id ? true : false}>
                                <option value="">Select Category</option>
                                <option value="Graphics & Design">Graphics & Design</option>
                                <option value="Mobile App Development">
                                  Mobile App Development
                                </option>
                                <option value="Frontend Web Development">
                                  Frontend Web Development
                                </option>
                                <option value="MERN Stack Development">
                                  MERN STACK Development
                                </option>
                                <option value="Account & Finance">Account & Finance</option>
                                <option value="Artificial Intelligence">
                                  Artificial Intelligence
                                </option>
                                <option value="Video Animation">Video Animation</option>
                                <option value="MEAN Stack Development">
                                  MEAN STACK Development
                                </option>
                                <option value="MEVN Stack Development">
                                  MEVN STACK Development
                                </option>
                                <option value="Data Entry Operator">Data Entry Operator</option>
                              </select>
                            </div>
                            <div>
                              <span className='sal'>Salary:{e.fixed_salary ?
                                (
                                  <div>
                                    <input type='number' disabled={edit !== e._id ? true : false} value={e.fixed_salary} onChange={(element) => inputchange(e._id, "fixed_salary", element.target.value)} />
                                  </div>
                                ) : (
                                  <div>
                                    <input type='number' disabled={edit !== e._id ? true : false} value={e.salary_from} onChange={(element) => inputchange(e._id, "salary_from", element.target.value)} />
                                    <input type='number' disabled={edit !== e._id ? true : false} value={e.salary_to} onChange={(element) => inputchange(e._id, "salary_to", element.target.value)} />
                                  </div>
                                )}</span>
                            </div>
                            <div>
                              <span>Expired: </span>
                              <select value={e.expired} onChange={(element) => inputchange(e._id, "expired", element.target.value)} disabled={edit !== e._id ? true : false}>
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                              </select>
                            </div>
                          </div>
                          <div className="long_fields">
                            <div>
                              <span>Description: </span>
                              <textarea rows="5" value={e.job_description} onChange={(element) => inputchange(e._id, "job_description", element.target.value)} disabled={edit !== e._id ? true : false}></textarea>
                            </div>
                            <div>
                              <span>Location: </span>
                              <textarea rows="5" value={e.location} onChange={(element) => inputchange(e._id, "location", element.target.value)} disabled={edit !== e._id ? true : false}></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="btns">
                          <div className="editwithbtn">
                            {
                              edit === e._id ? (
                                <>
                                  <button onClick={() => editing(e._id)} className='chk'><CheckIcon/></button>
                                  <button onClick={()=>disableedit()} className='cross'><CloseIcon/></button>
                                </>
                              ) : (
                                <button onClick={()=>enableedit(e._id)} className='edit_btn'>Edit</button>
                              )
                            }
                          </div>
                        </div>
                        <button onClick={()=>deleting(e._id)}className='delete_btn'>Delete</button>
                      </div>
                    );
                  })
                }
              </div>
            </>
          ) : (
            <p>You have Not posted any jobs or you may have deleted all posted jobs</p>
          )
        }
      </div>
    </div>
  )
}

export default Mypostedjobs
