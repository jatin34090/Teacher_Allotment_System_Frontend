
import React from 'react';
import "./header.css"
import { Link, useLocation } from 'react-router-dom';

const Li = ({ url, text }) => {
  const location = useLocation();

  return (
    <li className='transform transition-transform hover:scale-125 px-8 py-4 rounded-2xl' style={{ backgroundColor: location.pathname.includes(url) && "rgba(0,115,225,0.1)"
     }}>
      <Link
        to={url}
        style={{
          color: location.pathname.includes(url) ? "rgba(0,115,225)" : "black"
        }}
      >
        {text}
      </Link>
    </li>
  );
};

export default Li;
