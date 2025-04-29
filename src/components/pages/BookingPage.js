import React from "react";
import BookingForm from "../common/BookingForm";

function BookingPage() {
  return (
    <main className="booking-page">
      <h1>Reserve a Table</h1>
      <p>Fill in your details below to book a table at Little Lemon.</p>
      <BookingForm />
    </main>
  );
}

export default BookingPage;
