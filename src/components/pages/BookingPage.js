import React, { useReducer } from "react";
import BookingForm from "../common/BookingForm";
import { fetchAPI, submitAPI } from "../../api";

// Fetch times for a given date
const fetchAvailableTimes = (date) => {
  return fetchAPI(new Date(date));
};

// Reducer to update available times
const updateTimes = (state, action) => {
  if (action.type === "UPDATE_TIMES") {
    return fetchAvailableTimes(action.payload);
  }
  return state;
};

// Initialize times on component mount
const initializeTimes = () => {
  const today = new Date();
  return fetchAvailableTimes(today);
};

function BookingPage({ submitForm }) {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  return (
    <main className="booking-page">
      <h1>Reserve a Table</h1>
      <p>Fill in your details below to book a table at Little Lemon.</p>

      {/* Pass all required props to BookingForm */}
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
      />
    </main>
  );
}

export default BookingPage;
export { initializeTimes, updateTimes };
