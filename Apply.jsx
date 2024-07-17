import React, { useContext, useState } from 'react'
import {Context} from '../../main'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Apply.css'
const Apply = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [cover_letter,setCover_letter]=useState("");
  const [phone,setPhone]=useState("");
  const [address,setAddress]=useState("");
  const [resume,setResume]=useState(null);

  const {authenticated,user}=useContext(Context);

  const moveto=useNavigate();
  const file_change=(e)=>{
      const new_file=e.target.files[0];
      setResume(new_file);
  }
  const {id}=useParams();
  const postapplication=async(e)=>{
    e.preventDefault();
    const formdata=new FormData();
    formdata.append("name",name);
    formdata.append("email",email);
    formdata.append("cover_letter",cover_letter);
    formdata.append("phone",phone);
    formdata.append("address",address);
    formdata.append("resume",resume);
    formdata.append("_id",id);

    try {
       const {data}=await axios.post("http://localhost:4000/api/application/postapplication",formdata,{withCredentials:true,
        headers:{
           "Content-Type":"multipart/form-data"
        }
       });
       setName("");
       setEmail("");
       setCover_letter("");
       setPhone("");
       setAddress("");
       setResume("");
       toast.success(data.message);
       moveto("/jobs/getall");
    } catch (error) {
       toast.error(error.response.data.error);
    }
  }

  if(!authenticated || (user && user.role==="Employer"))
  {
    moveto("/");
  }
  return (
    <div className='applicant'>
        <div className="applicant_block">
             <h3>POST APPLICATION</h3>
             <form onSubmit={postapplication}>
                 <input type='text' placeholder='Your Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                 <input type='email' placeholder='Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                 <input type='number' placeholder='Your Contact no' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                 <input type='text' placeholder='Your Address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
                 <textarea value={cover_letter} placeholder='Cover Letter' onChange={(e)=>setCover_letter(e.target.value)}/>
                 <div>
                   <label style={{textAlign:'start',display:'block',fontSize:'20px'}}>Select Resume</label>
                   <input type='file' accept='.jpg, .png, .webp' onChange={file_change} style={{width:'100%'}}/>
                 </div>
                 <button type='submit'>Send Application</button>
             </form>
        </div>
    </div>
  )
}

export default Apply
