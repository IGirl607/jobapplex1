import React, { useContext } from 'react'
import {Context} from '../../main'
import { Link } from 'react-router-dom';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import './Footer.css';

const Footer = () => {
  const {authenticated}=useContext(Context);
  //target="_blank" can be useful for links that need to open external websites or documents in a new tab or window.
  return (
    <footer className={authenticated ? "showfooter" : "hidefooter"}>
         <div className='copyright'>&copy;All Rights Reserved by Jobkhojo</div>
         <div className='links'>
            <Link to={'/'} style={{color:'red'}}target="_blank"><YouTubeIcon/></Link>
            <Link to={'/'} style={{color:'#0077B5'}} target="_blank"><LinkedInIcon color="primary"/></Link>
            <Link to={'/'} style={{color:'#1877F2'}} target="_blank"><FacebookIcon/></Link>
            <Link to={'/'} style={{color:'#E4405F'}} target="_blank"><InstagramIcon/></Link> 
         </div>
    </footer>
  )
}

export default Footer
