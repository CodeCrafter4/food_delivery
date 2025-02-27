import React from 'react'
import "./Header.css"
const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Fresh, Fast, and Delivered to Your Door!</h2>
        <p>
          Enjoy delicious meals from your favorite restaurants, delivered hot
          and fresh in minutes. Order now and satisfy your cravings with Moshop!
        </p>
        <button id="explor-menu">View Menu</button>
      </div>
    </div>
  );
}

export default Header