import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
} from "@mui/material";

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const formik = useFormik({
    initialValues: {
      date: "",
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
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 300, display: "grid", gap: 3 }}
      noValidate
      aria-label="Booking Form"
    >
      {/* Date */}
      <TextField
        id="date"
        name="date"
        label="Choose date"
        type="date"
        value={formik.values.date}
        onChange={handleDateChange}
        onBlur={formik.handleBlur}
        InputLabelProps={{ shrink: true }}
        error={formik.touched.date && Boolean(formik.errors.date)}
        helperText={formik.touched.date && formik.errors.date}
        required
        inputProps={{
          "aria-required": true,
          "aria-invalid": !!(formik.touched.date && formik.errors.date),
        }}
      />

      {/* Time */}
      <FormControl
        fullWidth
        error={formik.touched.time && Boolean(formik.errors.time)}
        required
      >
        <InputLabel id="time-label">Choose time</InputLabel>
        <Select
          labelId="time-label"
          id="time"
          name="time"
          value={formik.values.time}
          label="Choose time"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          inputProps={{
            "aria-required": true,
            "aria-invalid": !!(formik.touched.time && formik.errors.time),
          }}
        >
          <MenuItem value="">
            <em>Select a time</em>
          </MenuItem>
          {availableTimes.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.time && formik.errors.time && (
          <FormHelperText>{formik.errors.time}</FormHelperText>
        )}
      </FormControl>

      {/* Guests */}
      <TextField
        id="guests"
        name="guests"
        label="Number of Guests"
        type="number"
        value={formik.values.guests}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        inputProps={{ min: 1, max: 10 }}
        error={formik.touched.guests && Boolean(formik.errors.guests)}
        helperText={formik.touched.guests && formik.errors.guests}
        required
        aria-required="true"
        aria-invalid={!!(formik.touched.guests && formik.errors.guests)}
      />

      {/* Occasion */}
      <FormControl
        fullWidth
        error={formik.touched.occasion && Boolean(formik.errors.occasion)}
        required
      >
        <InputLabel id="occasion-label">Occasion</InputLabel>
        <Select
          labelId="occasion-label"
          id="occasion"
          name="occasion"
          value={formik.values.occasion}
          label="Occasion"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          inputProps={{
            "aria-required": true,
            "aria-invalid": !!(formik.touched.occasion && formik.errors.occasion),
          }}
        >
          <MenuItem value="Birthday">Birthday</MenuItem>
          <MenuItem value="Anniversary">Anniversary</MenuItem>
        </Select>
        {formik.touched.occasion && formik.errors.occasion && (
          <FormHelperText>{formik.errors.occasion}</FormHelperText>
        )}
      </FormControl>

      {/* Submit */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!formik.isValid || formik.isSubmitting}
        aria-label="Submit Booking Form"
      >
        Book Now
      </Button>
    </Box>
  );
}

export default BookingForm;
