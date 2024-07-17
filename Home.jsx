import React, { useContext } from 'react'
import { Context } from '../../main'
import { Navigate } from 'react-router-dom';
import Actsection from './Actsection';
import Working from './Working';
import Category from './Popular/Category';
import Company from './Popular/Company';

const Home = () => {

  const {authenticated}=useContext(Context);
  if(!authenticated)
  {
      return <Navigate to={"/login"}/>
  }
  return (
    <section className='homepg'>
         <Actsection/>
         <Working/>
         <Category/>
         <Company/>
    </section>
  )
}

export default Home
