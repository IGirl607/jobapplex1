import React from 'react'
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AppsIcon from '@mui/icons-material/Apps';
import WebhookIcon from '@mui/icons-material/Webhook';
import { FaReact } from "react-icons/fa";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { GiArtificialIntelligence } from "react-icons/gi";
import AnimationIcon from '@mui/icons-material/Animation';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import './Category.css';

const Category = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <DesignServicesIcon />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <AppsIcon />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <WebhookIcon />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <AccountBalanceIcon />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <AnimationIcon />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <SportsEsportsIcon />,
    },
  ];
  return (
    <div className='types'>
      <h3>POPULAR CATEGORIES</h3>
      <div className="categs">
        {
          categories.map(e => {
            return (
              <div className="cards1" key={e.id}>
                <div className="pics1">{e.icon}</div>
                <div className="detail1">
                  <b><p>{e.title}</p></b>
                  <p>{e.subTitle}</p>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}

export default Category
