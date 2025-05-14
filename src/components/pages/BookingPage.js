import React, { useReducer } from "react";
import BookingForm from "../common/BookingForm";

// Simulated function to fetch available times for a date
const fetchAvailableTimes = (date) => {
  return ['17:00', '18:00', '19:00', '20:00', '21:00'];
};

// Reducer to update available times
const updateTimes = (state, action) => {
  if (action.type === 'UPDATE_TIMES') {
    return fetchAvailableTimes(action.payload);
  }
  return state;
};

// Initializer for available times
const initializeTimes = () => fetchAvailableTimes(new Date());

function BookingPage() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  return (
    <main className="booking-page">
      <h1>Reserve a Table</h1>
      <p>Fill in your details below to book a table at Little Lemon.</p>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </main>
  );
}

export default BookingPage;
export { initializeTimes, updateTimes };