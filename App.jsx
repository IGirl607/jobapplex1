import React, { useContext, useEffect } from 'react'
import './App.css'
import { Context } from './main'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Navbar from './components/Headfoot/Navbar'
import Footer from './components/Headfoot/Footer'
import Home from './components/Home/Home'
import Jobs from './components/Job/Jobs'
import Jobinfo from './components/Job/Jobinfo'
import Mypostedjobs from './components/Job/Mypostedjobs'
import Apply from './components/Application/Apply'
import Myapply from './components/Application/Myapply'
import Notfound from './components/Notfound/Notfound'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import Postjobs from './components/Job/Postjobs'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const App = () => {

  const{authenticated,setAuthenticated,setUser}=useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/user/getuser",
          {
            withCredentials: true,
          }
        );
        console.log(response.data.user);
        setUser(response.data.user);
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      }
    };
    if(authenticated)
    {
      fetchUser();
    }
  }, [authenticated]);
  /*useffect is used to run whenever the dependency parameter is changed whereas
  if there is no dependence it is run whenever we reload the site*/
  
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/jobs/getall' element={<Jobs />} />
          <Route path='/jobs/me' element={<Mypostedjobs />} />
          <Route path='/jobs/post' element={<Postjobs />} />
          <Route path='/jobinfo/:id' element={<Jobinfo />} />
          <Route path='/apply/:id' element={<Apply />} />
          <Route path='/apply/me' element={<Myapply />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </div>
  )
}

export default App
