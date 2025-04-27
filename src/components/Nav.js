import React, { useState } from 'react';
import '../App.css';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setTimeout(() => setMenuOpen(false), 600);
  };

  return (
    <nav>
      <button
        className={`menu-toggle ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <div></div>
        <div></div>
        <div></div>
      </button>

      <div className={`nav-container ${menuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li>
            <a href="#home" onClick={handleLinkClick}>
              <i className="fas fa-home"></i> Home
            </a>
          </li>
          <li>
            <a href="#menu" onClick={handleLinkClick}>
              <i className="fas fa-utensils"></i> Menu
            </a>
          </li>
          <li>
            <a href="#about" onClick={handleLinkClick}>
              <i className="fas fa-info-circle"></i> About
            </a>
          </li>
          <li>
            <a href="#contact" onClick={handleLinkClick}>
              <i className="fas fa-envelope"></i> Contact
            </a>
          </li>
        </ul>
      </div>

      <div className="nav-icons">
        <a href="/cart" className="cart-icon" onClick={handleLinkClick}>
          <i className="fas fa-shopping-bag"></i>
        </a>
        <a href="/profile" className="profile-icon" onClick={handleLinkClick}>
          <i className="fas fa-user"></i>
        </a>
      </div>
    </nav>
  );
}

export default Nav;
