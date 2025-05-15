import React from 'react';
import { useNavigate } from 'react-router-dom';

function ConfirmedBooking() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Booking Confirmed!</h1>
      <p>Thank you for reserving a table at Little Lemon. We look forward to serving you!</p>
      <button onClick={handleGoHome}>
        Go to Homepage
      </button>
    </main>
  );
}

export default ConfirmedBooking;
