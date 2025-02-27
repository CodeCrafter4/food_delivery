import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar = () => {
  return (
    <div className="navbar">
      {/* <img className='logo' src={assets.logo} alt="" /> */}
      <h2 className="logo">FastFeast </h2>

      {/* <img src={assets.profile_image} alt="" /> */}
      <h5 className="profile">Admin Panel</h5>
    </div>
  );
}

export default Navbar