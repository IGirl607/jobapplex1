import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './Resume.css';

const Resume = ({imageUrl,onClose}) => {
  return (
    <div className='resume_area'>
        <div className="resume_block">
            <span onClick={onClose} className='close'><CloseIcon/></span>
            <img src={imageUrl} alt=''></img>
        </div>
    </div>
  )
}

export default Resume
