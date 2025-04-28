function BookingPage() {
    return (
      <main className="booking-page">
        <h1>Reserve a Table</h1>
        <p>Fill in your details below to book a table at Little Lemon.</p>

        <form className="booking-form">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" required />

          <label htmlFor="time">Time:</label>
          <input type="time" id="time" name="time" required />

          <label htmlFor="guests">Number of Guests:</label>
          <input type="number" id="guests" name="guests" min="1" required />

          <button type="submit">Book Now</button>
        </form>
      </main>
    );
  }

  export default BookingPage;
