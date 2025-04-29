import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setTimeout(() => setMenuOpen(false), 450);
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
            <Link to="/" onClick={handleLinkClick}>
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/menu" onClick={handleLinkClick}>
              <i className="fas fa-utensils"></i> Menu
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={handleLinkClick}>
              <i className="fas fa-info-circle"></i> About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleLinkClick}>
              <i className="fas fa-envelope"></i> Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className="nav-icons">
        <Link to="/cart" className="cart-icon" onClick={handleLinkClick}>
          <i className="fas fa-shopping-bag"></i>
        </Link>
        <Link to="/profile" className="profile-icon" onClick={handleLinkClick}>
          <i className="fas fa-user"></i>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
