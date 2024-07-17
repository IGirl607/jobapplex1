import React, { useState } from 'react'
import { useContext } from 'react';
import { Context } from '../../main'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Postjobs.css'


const Postjobs = () => {
  const [job_title, setJob_title] = useState("");
  const [job_description, setJob_description] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salary_from, setSalary_from] = useState("");
  const [salary_to, setSalary_to] = useState("");
  const [fixed_salary, setFixed_salary] = useState("");
  const [salarytype, setSalarytype] = useState("default");

  const { authenticated, user } = useContext(Context);
  const moveto = useNavigate();

  const Jobpost = async (e) => {
    e.preventDefault();
    if (salarytype === "fixed salary") {
      setSalary_from("");
      setSalary_to("");
    }
    else if (salarytype === "ranged salary") {
      setFixed_salary("");
    }
    else {
      setSalary_from("");
      setSalary_to("");
      setFixed_salary("");
    }

    await axios.post("http://localhost:4000/api/job/postjob", fixed_salary.length >= 4 ? { job_title, job_description, category, country, city, location, fixed_salary } : { job_title, job_description, category, country, city, location, salary_from, salary_to }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      toast.success(res.data.message);
    }).catch((err) => {
      toast(err.response.data.error);
    });
  }

  if (!authenticated || (user && user.role !== "Employer")) {
    moveto("/");
  }
  return (
    <div className='jobposting'>
      <div className="jobpostblock">
        <h3>POST NEW JOB</h3>
        <form onSubmit={Jobpost}>
          <div className="formfull">
            <input type='text' value={job_title} onChange={(e) => { setJob_title(e.target.value) }} placeholder='Job Title'></input>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="Graphics & Design">
                Graphics & Design
              </option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              <option value="Frontend Web Development">
                Frontend Web Development
              </option>
              <option value="MERN Stack Development">
                MERN STACK Development
              </option>
              <option value="Account & Finance">
                Account & Finance
              </option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Video Animation">
                Video Animation
              </option>
              <option value="MEAN Stack Development">
                MEAN STACK Development
              </option>
              <option value="MEVN Stack Development">
                MEVN STACK Development
              </option>
              <option value="Data Entry Operator"
              >Data Entry Operator
              </option>
              <option value="Assistant Professor">
                Assistant Professor
              </option>
              <option value="Account Coordinator">
                Account Coordinator
              </option>
              <option value="Structural Engineer">
                Structural Engineer
              </option>
              <option value="Automation Specialist IV">
                Automation Specialist IV
              </option>
              <option value="Quality Control Specialist">
                Quality Control Specialist
              </option>
              <option value="Human Resources Assistant II">
                Human Resources Assistant II
              </option>
              <option value="Software Engineer II">
                Software Engineer II
              </option>
              <option value="Programmer Analyst III">
                Programmer Analyst III
              </option>
              <option value="Nuclear Power Engineer">
                Nuclear Power Engineer
              </option>
            </select>
          </div>
          <div className="formfull">
            <input type='text' value={country} onChange={(e) => { setCountry(e.target.value) }} placeholder='Country'></input>
            <input type='text' value={city} onChange={(e) => { setCity(e.target.value) }} placeholder='City'></input>
          </div>
          <input type='text' className='loc' value={location} onChange={(e) => { setLocation(e.target.value) }} placeholder='Location'></input>
          <div className="netsalary">
            <select value={salarytype} onChange={(e) => setSalarytype(e.target.value)}>
              <option value="default">Salary Type</option>
              <option value="fixed salary">Fixed Salary</option>
              <option value="ranged salary">Ranged Salary</option>
            </select>
            <div>
              {salarytype === "default" ? (
                <p className='imp'>Please * provide Salary Type</p>
              ) : salarytype === "fixed salary" ? (
                <input
                  type="number"
                  placeholder="Enter Fixed Salary"
                  value={fixed_salary}
                  className='fix'
                  onChange={(e) => setFixed_salary(e.target.value)}
                />
              ) : (
                <div className="ranged">
                  <input
                    type="number"
                    placeholder="Salary From"
                    value={salary_from}
                    onChange={(e) => setSalary_from(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Salary To"
                    value={salary_to}
                    onChange={(e) => setSalary_to(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          <textarea rows="10" value={job_description} onChange={(e) => setJob_description(e.target.value)} placeholder='Description'></textarea>
          <button className='btn' type='submit'>Post Job</button>
        </form>
      </div>
    </div>
  )
}

export default Postjobs
