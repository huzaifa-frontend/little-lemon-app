import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const formik = useFormik({
    initialValues: {
      date: null,
      time: "",
      guests: 1,
      occasion: "Birthday",
    },
    validationSchema: Yup.object({
      date: Yup.date()
        .nullable()
        .transform((value, originalValue) => {
          if (!originalValue) return null;
          const parsedDate = new Date(originalValue);
          return isNaN(parsedDate) ? null : parsedDate;
        })
        .required("Date is required")
        .min(new Date().setHours(0, 0, 0, 0), "Date cannot be in the past"),
      time: Yup.string().required("Time is required"),
      guests: Yup.number()
        .required("Number of guests is required")
        .min(1, "At least 1 guest is required")
        .max(10, "Maximum 10 guests allowed"),
      occasion: Yup.string().required("Occasion is required"),
    }),
    validateOnMount: true,
    onSubmit: (values) => {
      submitForm({
        ...values,
        guests: Number(values.guests),
      });
    },
  });

  const handleDateChange = (e) => {
    formik.handleChange(e);
    dispatch({ type: "UPDATE_TIMES", payload: e.target.value });
  };

  return (
    <form
      className="booking-form"
      onSubmit={formik.handleSubmit}
      style={{ display: "grid", maxWidth: "300px", gap: "20px" }}
      noValidate
      aria-label="Booking Form"
    >
      {/* Date */}
      <label htmlFor="date">Choose date</label>
      <input
        type="date"
        id="date"
        name="date"
        value={formik.values.date || ""}
        onChange={handleDateChange}
        onBlur={formik.handleBlur}
        required
        aria-required="true"
        aria-invalid={!!(formik.touched.date && formik.errors.date)}
      />
      {formik.touched.date && formik.errors.date && (
        <div className="error" role="alert" aria-live="polite">
          {formik.errors.date}
        </div>
      )}

      {/* Time */}
      <label htmlFor="time">Choose time</label>
      <select
        id="time"
        name="time"
        value={formik.values.time}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
        aria-required="true"
        aria-invalid={!!(formik.touched.time && formik.errors.time)}
      >
        <option value="">Select a time</option>
        {availableTimes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      {formik.touched.time && formik.errors.time && (
        <div className="error" role="alert" aria-live="polite">
          {formik.errors.time}
        </div>
      )}

      {/* Guests */}
      <label htmlFor="guests">Number of Guests</label>
      <input
        type="number"
        id="guests"
        name="guests"
        value={formik.values.guests}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        min="1"
        max="10"
        required
        aria-required="true"
        aria-invalid={!!(formik.touched.guests && formik.errors.guests)}
      />
      {formik.touched.guests && formik.errors.guests && (
        <div className="error" role="alert" aria-live="polite">
          {formik.errors.guests}
        </div>
      )}

      {/* Occasion */}
      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        name="occasion"
        value={formik.values.occasion}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
        aria-required="true"
        aria-invalid={!!(formik.touched.occasion && formik.errors.occasion)}
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>
      {formik.touched.occasion && formik.errors.occasion && (
        <div className="error" role="alert" aria-live="polite">
          {formik.errors.occasion}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!formik.isValid || formik.isSubmitting}
        aria-label="Submit Booking Form"
      >
        Book Now
      </button>
    </form>
  );
}

export default BookingForm;
