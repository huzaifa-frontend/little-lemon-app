import React, { useState } from "react";
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
  Snackbar,
  Container,
  Typography,
  Fade,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      date: "",
      time: "",
      guests: 1,
      occasion: "Birthday",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[A-Za-z\s'-]+$/, "Only letters, Spaces, Apostrophes, and Hyphens allowed")
        .required("First name is required"),
      lastName: Yup.string()
        .matches(/^[A-Za-z\s'-]+$/, "Only letters, Spaces, Apostrophes, and Hyphens allowed")
        .required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      contact: Yup.string()
        .matches(/^\d{10,15}$/, "Enter valid contact number")
        .required("Contact is required"),
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
    validateOnChange: false, //When comment this line the form will become more good but it will lag
    onSubmit: (values, { resetForm }) => {
      submitForm({
        ...values,
        guests: Number(values.guests),
      });
      setOpenSnackbar(true);
      resetForm();
    },
  });

  const handleDateChange = (e) => {
    formik.handleChange(e);
    dispatch({ type: "UPDATE_TIMES", payload: e.target.value });
  };

  return (
    <Container maxWidth="sm">
      <Fade in={true} timeout={800}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            mt: 6,
            mb: 4,
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: "#fefefe",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
          noValidate
        >
          <Typography variant="h5" textAlign="center" fontWeight={600}>
            Reserve Your Table
          </Typography>

          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            required
          />

          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            required
          />

          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            required
          />

          <TextField
            id="contact"
            name="contact"
            label="Contact Number"
            type="tel"
            value={formik.values.contact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
            helperText={formik.touched.contact && formik.errors.contact}
            required
          />

          <TextField
            id="date"
            name="date"
            label="Choose Date"
            type="date"
            value={formik.values.date}
            onChange={handleDateChange}
            onBlur={formik.handleBlur}
            InputLabelProps={{ shrink: true }}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
            required
          />

          <FormControl
            fullWidth
            error={formik.touched.time && Boolean(formik.errors.time)}
            required
          >
            <InputLabel id="time-label">Choose Time</InputLabel>
            <Select
              labelId="time-label"
              id="time"
              name="time"
              value={formik.values.time}
              label="Choose Time"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
          />

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
            >
              <MenuItem value="Birthday">Birthday</MenuItem>
              <MenuItem value="Anniversary">Anniversary</MenuItem>
              <MenuItem value="Casual">Casual</MenuItem>
            </Select>
            {formik.touched.occasion && formik.errors.occasion && (
              <FormHelperText>{formik.errors.occasion}</FormHelperText>
            )}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            disabled={!formik.isValid || formik.isSubmitting}
            sx={{
              py: 1.2,
              backgroundColor: "#495E57",
              color: "#fff",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#FACE14",
                color: "#000",
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            Book Now
          </Button>
        </Box>
      </Fade>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Booking submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default BookingForm;
