function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer-section contact-info">
          <h4>Contact Us</h4>
          <p>Email: info@littlelemon.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Location: 123 Main St, Chicago, IL</p>
        </div>

        <div className="footer-section quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section social-media">
          <h4>Follow Us</h4>
          <ul className="social-icons">
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a></li>
          </ul>
        </div>

        <div className="footer-section company-rights">
          <p>&copy; 2025 Little Lemon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
