import React from 'react';
import '../../App.css';

function CallToAction() {
  return (
    <section className="call-to-action">
      <div className="cta-content">
        <h2>Ready to Book Your Table?</h2>
        <p>Reserve now and enjoy the Little Lemon experience!</p>
        <a href="/booking" className="cta-button">Reserve a Table</a>
      </div>
    </section>
  );
}

export default CallToAction;
