import React from 'react'
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { SiTesla } from "react-icons/si";
import AppleIcon from '@mui/icons-material/Apple';
import './Company.css'

const Company = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "DLF Building, Connaught Place, New Delhi",
      openPositions: 10,
      icon: <MicrosoftIcon />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "1 Tesla Road Austin, TX 78725",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "A523, Sector47, Noida,India",
      openPositions: 20,
      icon: <AppleIcon />,
    },
  ];
  return (
    <div className='company'>
      <div className="topcompanies">
        <h3>TOP COMPANIES</h3>
        <div className="compny">
          {
            companies.map(e => {
              return (
                <>
                  <div className="cards2" key={e.id}>
                    <div className="pics1">{e.icon}</div>
                    <div className="detail1">
                      <b><p>{e.title}</p></b>
                      <p>{e.location}</p>
                      <button>Open Positions {e.openPositions}</button>
                    </div>
                  </div>
                </>
              );
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Company
