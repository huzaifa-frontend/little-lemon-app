import React, { useReducer } from "react";
import BookingForm from "../common/BookingForm";
import { fetchAPI } from '../../api';

// Function to fetch available times using the provided API
const fetchAvailableTimes = (date) => {
  return fetchAPI(new Date(date));
};

// Reducer to update available times
const updateTimes = (state, action) => {
  if (action.type === 'UPDATE_TIMES') {
    return fetchAvailableTimes(action.payload);
  }
  return state;
};

// Initializer for available times
const initializeTimes = () => {
  const today = new Date();
  return fetchAvailableTimes(today);
};

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
