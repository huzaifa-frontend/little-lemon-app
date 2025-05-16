import React, { useReducer } from "react";
import BookingForm from "../common/BookingForm";
import { fetchAPI } from "../../api";

const fetchAvailableTimes = (date) => {
  return fetchAPI(new Date(date));
};

const updateTimes = (state, action) => {
  if (action.type === "UPDATE_TIMES") {
    return fetchAvailableTimes(action.payload);
  }
  return state;
};

const initializeTimes = () => {
  const today = new Date();
  return fetchAvailableTimes(today);
};

function BookingPage({ submitForm }) {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  return (
    <main className="booking-page">
      <p>Fill in your details below to book a table at Little Lemon.</p>
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
