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
  Slide,
  Zoom,
  Paper,
  Grid,
  Avatar,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  Restaurant,
  Person,
  Email,
  Phone,
  DateRange,
  Schedule,
  Groups,
  Celebration,
  CheckCircle,
  Star,
} from "@mui/icons-material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BookingForm({ availableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"], dispatch, submitForm }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        .matches(/^[A-Za-z\s'-]+$/, "Only letters, spaces, apostrophes, and hyphens allowed")
        .required("First name is required"),
      lastName: Yup.string()
        .matches(/^[A-Za-z\s'-]+$/, "Only letters, spaces, apostrophes, and hyphens allowed")
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
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (submitForm) {
        submitForm({
          ...values,
          guests: Number(values.guests),
        });
      }

      setIsSubmitting(false);
      setOpenSnackbar(true);
      resetForm();
      setFormStep(0);
    },
  });

  const handleDateChange = (e) => {
    formik.handleChange(e);
    if (dispatch) {
      dispatch({ type: "UPDATE_TIMES", payload: e.target.value });
    }
  };

  const getProgressValue = () => {
    const filledFields = Object.values(formik.values).filter(value => value !== "" && value !== null).length;
    return (filledFields / Object.keys(formik.values).length) * 100;
  };

  const occasionColors = {
    Birthday: "#f4ce14",
    Anniversary: "#ee0928ff",
    Casual: "#19c541ff",
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header Section */}
      <Fade in={true} timeout={1000}>
        <Box textAlign="center" mb={4}>
          <Zoom in={true} timeout={1200}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
                background: "linear-gradient(135deg, #495e57 0%, #3a4a45 100%)",
              }}
            >
              <Restaurant sx={{ fontSize: 40 }} />
            </Avatar>
          </Zoom>
          <Typography variant="h3" component="h1" fontWeight={700} color="primary" mb={1}>
            Reserve Your Table
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ opacity: 0.8 }}>
            Experience culinary excellence with us
          </Typography>
          <Box display="flex" justifyContent="center" mt={2} gap={1}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} sx={{ color: "#FFD700", fontSize: 20 }} />
            ))}
          </Box>
        </Box>
      </Fade>

      {/* Progress Bar */}
      <Slide direction="down" in={true} timeout={800}>
        <Card sx={{ mb: 3, background: "linear-gradient(135deg, #495e57 0%, #3a4a45 100%)" }}>
          <CardContent sx={{ py: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body2" color="white" fontWeight={600}>
                Form Progress
              </Typography>
              <Box flexGrow={1}>
                <LinearProgress
                  variant="determinate"
                  value={getProgressValue()}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "rgba(255,255,255,0.3)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#f4ce14",
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" color="white" fontWeight={600}>
                {Math.round(getProgressValue())}%
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Slide>

      {/* Main Form */}
      <Fade in={true} timeout={1200}>
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            background: "linear-gradient(135deg, #fefefe 0%, #f8f9fa 100%)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: "linear-gradient(90deg, #f4ce14 0%, #495e57 100%)",
            },
          }}
        >
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={3}>
              {/* Personal Information Heading */}
              <Grid item xs={12}>
                <Fade in={true} timeout={600}>
                  <Box mb={3} display="flex" justifyContent="center" alignItems="center" gap={1}>
                    <Person sx={{ fontSize: 28 }} color="primary" />
                    <Typography variant="h5" fontWeight={600} color="primary">
                      Personal Information
                    </Typography>
                  </Box>
                </Fade>
              </Grid>

              {/* Personal Information Inputs */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Zoom in={true} timeout={800} style={{ transitionDelay: "100ms" }}>
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
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                          },
                        },
                      }}
                    />
                  </Zoom>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Zoom in={true} timeout={800} style={{ transitionDelay: "200ms" }}>
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
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                          },
                        },
                      }}
                    />
                  </Zoom>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Zoom in={true} timeout={800} style={{ transitionDelay: "300ms" }}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        },
                      },
                    }}
                  />
                </Zoom>
              </Grid>

              <Grid item xs={12} md={6}>
                <Zoom in={true} timeout={800} style={{ transitionDelay: "400ms" }}>
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
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        },
                      },
                    }}
                  />
                </Zoom>
              </Grid>
              {/* Reservation Details Section */}
              <Grid container justifyContent="center" mb={3}>
                <Grid item xs={12}>
                  <Slide direction="left" in={true} timeout={600}>
                    <Box display="flex" alignItems="center" gap={1} px={2}>
                      <Restaurant sx={{ fontSize: 28 }} color="primary" />
                      <Typography variant="h5" fontWeight={600} color="primary">
                        Reservation Details
                      </Typography>
                    </Box>
                  </Slide>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Zoom in={true} timeout={800} style={{ transitionDelay: "500ms" }}>
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
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DateRange color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                          },
                        },
                      }}
                    />
                  </Zoom>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Zoom in={true} timeout={800} style={{ transitionDelay: "600ms" }}>
                    <FormControl
                      fullWidth
                      error={formik.touched.time && Boolean(formik.errors.time)}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                          },
                        },
                      }}
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
                        startAdornment={
                          <InputAdornment position="start">
                            <Schedule color="action" />
                          </InputAdornment>
                        }
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
                  </Zoom>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Zoom in={true} timeout={800} style={{ transitionDelay: "700ms" }}>
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
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Groups color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                          },
                        },
                      }}
                    />
                  </Zoom>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Zoom in={true} timeout={800} style={{ transitionDelay: "800ms" }}>
                    <FormControl
                      fullWidth
                      error={formik.touched.occasion && Boolean(formik.errors.occasion)}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                          },
                        },
                      }}
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
                        startAdornment={
                          <InputAdornment position="start">
                            <Celebration color="action" />
                          </InputAdornment>
                        }
                      >
                        {["Birthday", "Anniversary", "Casual"].map((occasion) => (
                          <MenuItem key={occasion} value={occasion}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Chip
                                size="small"
                                sx={{
                                  backgroundColor: occasionColors[occasion],
                                  color: "white",
                                  minWidth: 8,
                                  height: 8,
                                  "& .MuiChip-label": { display: "none" },
                                }}
                              />
                              {occasion}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.occasion && formik.errors.occasion && (
                        <FormHelperText>{formik.errors.occasion}</FormHelperText>
                      )}
                    </FormControl>
                  </Zoom>
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Zoom in={true} timeout={1000} style={{ transitionDelay: "900ms" }}>
                  <Box sx={{ mt: 3 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!formik.isValid || isSubmitting}
                      fullWidth
                      size="large"
                      startIcon={isSubmitting ? null : <CheckCircle />}
                      sx={{
                        py: 2,
                        borderRadius: 3,
                        background: isSubmitting
                          ? "linear-gradient(135deg, #ccc 0%, #999 100%)"
                          : "linear-gradient(135deg, #495e57 0%, #3a4a45 100%)",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        textTransform: "none",
                        boxShadow: "0 4px 15px rgba(73, 94, 87, 0.4)",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 6px 20px rgba(73, 94, 87, 0.6)",
                          background: "linear-gradient(135deg, #f4ce14 0%, #e6b800 100%)",
                        },
                        "&:active": {
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      {isSubmitting ? (
                        <Box display="flex" alignItems="center" gap={2}>
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              border: "2px solid #fff",
                              borderTop: "2px solid transparent",
                              borderRadius: "50%",
                              animation: "spin 1s linear infinite",
                              "@keyframes spin": {
                                "0%": { transform: "rotate(0deg)" },
                                "100%": { transform: "rotate(360deg)" },
                              },
                            }}
                          />
                          Processing...
                        </Box>
                      ) : (
                        "Reserve My Table"
                      )}
                    </Button>
                  </Box>
                </Zoom>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Fade>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Slide}
      >
        <Alert
          severity="success"
          onClose={() => setOpenSnackbar(false)}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            "& .MuiAlert-icon": {
              fontSize: 24,
            },
          }}
        >
          🎉 Reservation confirmed! We can't wait to serve you!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default BookingForm;