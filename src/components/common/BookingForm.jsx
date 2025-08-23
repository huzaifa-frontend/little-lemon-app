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
  InputAdornment,
  Divider,
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
  TableRestaurant,
  LocalDining,
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

  const getProgressValue = React.useMemo(() => {
    const filledFields = Object.values(formik.values).filter(value => value !== "" && value !== null).length;
    return (filledFields / Object.keys(formik.values).length) * 100;
  }, [formik.values.firstName, formik.values.lastName, formik.values.email, formik.values.contact, formik.values.date, formik.values.time, formik.values.guests, formik.values.occasion]);

  const occasionColors = {
    Birthday: "#f4ce14",
    Anniversary: "#ee0928ff",
    Casual: "#19c541ff",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        {/* Enhanced Header Section */}
        <Fade in={true} timeout={1000}>
          <Box textAlign="center" mb={{ xs: 4, md: 6 }}>
            <Zoom in={true} timeout={1200}>
              <Avatar
                sx={{
                  width: { xs: 75, sm: 85, md: 100 },
                  height: { xs: 75, sm: 85, md: 100 },
                  mx: "auto",
                  mb: { xs: 2, md: 3 },
                  background: "linear-gradient(135deg, #495e57 0%, #3a4a45 100%)",
                  boxShadow: {
                    xs: "0 4px 16px rgba(73, 94, 87, 0.2)",
                    md: "0 8px 24px rgba(73, 94, 87, 0.3)"
                  },
                }}
              >
                <LocalDining sx={{ fontSize: { xs: 35, sm: 42, md: 50 } }} />
              </Avatar>
            </Zoom>

            <Typography
              variant="h2"
              component="h1"
              fontWeight={800}
              sx={{
                background: "linear-gradient(135deg, #495e57 0%, #3a4a45 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: { xs: 1.5, md: 2 },
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3.75rem" },
                lineHeight: { xs: 1.2, md: 1.1 }
              }}
            >
              Reserve Your Table
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
                fontWeight: 300,
                mb: { xs: 2, md: 3 },
                maxWidth: { xs: 350, sm: 500, md: 600 },
                mx: "auto",
                lineHeight: { xs: 1.3, md: 1.4 },
                fontSize: { xs: "0.99rem", sm: "1.1rem", md: "1.5rem" },
                px: { xs: 2, sm: 1, md: 0 }
              }}
            >
              Embark on a culinary journey at Little Lemon - where every meal is a celebration of authentic flavors and unforgettable moments
            </Typography>

            <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} sx={{ color: "#FFD700", fontSize: { xs: 20, sm: 24, md: 28 } }} />
              ))}
              <Typography variant="body1" sx={{
                ml: { xs: 0.5, md: 1 },
                fontWeight: 600,
                color: "text.secondary",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }
              }}>
                5.0 (2,847 reviews)
              </Typography>
            </Box>

            <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
              <Chip
                icon={<Restaurant />}
                label="Mediterranean Cuisine"
                sx={{
                  backgroundColor: "#f4ce14",
                  color: "#495e57",
                  fontWeight: 600,
                }}
              />
              <Chip
                icon={<TableRestaurant />}
                label="Premium Dining"
                sx={{
                  backgroundColor: "#f4ce14",
                  color: "#495e57",
                  fontWeight: 600,
                }}
              />
            </Box>
          </Box>
        </Fade>

        {/* Progress Bar */}
        <Slide direction="down" in={true} timeout={800}>
          <Card sx={{
            mb: 4,
            background: "linear-gradient(135deg, #495e57 0%, #3a4a45 100%)",
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(73, 94, 87, 0.2)",
          }}>
            <CardContent sx={{ py: { xs: 2, md: 3 } }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography
                  variant="body1"
                  color="white"
                  fontWeight={600}
                  sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
                >
                  Progress
                </Typography>
                <Box flexGrow={1}>
                  <LinearProgress
                    variant="determinate"
                    value={getProgressValue}
                    sx={{
                      height: { xs: 6, md: 8 },
                      borderRadius: 4,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#f4ce14",
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="white"
                  fontWeight={600}
                  sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                >
                  {Math.round(getProgressValue)}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Slide>

        {/* Main Form */}
        <Fade in={true} timeout={1200}>
          <Paper
            elevation={12}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 6,
                background: "linear-gradient(90deg, #f4ce14 0%, #495e57 50%, #f4ce14 100%)",
              },
            }}
          >
            <Box component="form" onSubmit={formik.handleSubmit} noValidate>
              {/* Personal Information Section */}
              <Box mb={6}>
                <Fade in={true} timeout={600}>
                  <Box textAlign="center" mb={4}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      gap={{ xs: 1, md: 2 }}
                      mb={2}
                    >
                      <Person sx={{ fontSize: { xs: 24, sm: 28, md: 32 }, color: "#495e57" }} />
                      <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{
                          color: "#495e57",
                          position: "relative",
                          fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2.125rem" },
                          whiteSpace: "nowrap"
                        }}
                      >
                        Personal Information
                      </Typography>
                    </Box>
                    <Divider sx={{
                      maxWidth: { xs: 150, md: 200 },
                      mx: "auto",
                      borderWidth: { xs: 1, md: 2 },
                      borderColor: "#f4ce14"
                    }} />
                  </Box>
                </Fade>

                <Grid container spacing={3} justifyContent="center">
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
                            "&.Mui-focused": {
                              boxShadow: "0 2px 8px rgba(73, 94, 87, 0.15)",
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
                            "&.Mui-focused": {
                              boxShadow: "0 2px 8px rgba(73, 94, 87, 0.15)",
                            },
                          },
                        }}
                      />
                    </Zoom>
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
                            "&.Mui-focused": {
                              boxShadow: "0 2px 8px rgba(73, 94, 87, 0.15)",
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
                            "&.Mui-focused": {
                              boxShadow: "0 2px 8px rgba(73, 94, 87, 0.15)",
                            },
                          },
                        }}
                      />
                    </Zoom>
                  </Grid>
                </Grid>
              </Box>

              {/* Reservation Details Section */}
              <Box mb={6}>
                <Slide direction="up" in={true} timeout={600}>
                  <Box textAlign="center" mb={4}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      gap={{ xs: 1, md: 2 }}
                      mb={2}
                    >
                      <Restaurant sx={{ fontSize: { xs: 24, sm: 28, md: 32 }, color: "#495e57" }} />
                      <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{
                          color: "#495e57",
                          fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2.125rem" },
                          whiteSpace: "nowrap"
                        }}
                      >
                        Reservation Details
                      </Typography>
                    </Box>
                    <Divider sx={{
                      maxWidth: { xs: 150, md: 200 },
                      mx: "auto",
                      borderWidth: { xs: 1, md: 2 },
                      borderColor: "#f4ce14"
                    }} />
                  </Box>
                </Slide>

                <Grid container spacing={3} justifyContent="center">
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
                            "&.Mui-focused": {
                              boxShadow: "0 2px 8px rgba(73, 94, 87, 0.15)",
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
                            "&.Mui-focused": {
                              boxShadow: "0 2px 8px rgba(73, 94, 87, 0.15)",
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
                            borderRadius: 3,
                            transition: "box-shadow 0.2s ease-in-out",
                            "&:hover": {
                              boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 4px 12px rgba(73, 94, 87, 0.15)",
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
                            borderRadius: 3,
                            transition: "box-shadow 0.2s ease-in-out",
                            "&:hover": {
                              boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 4px 12px rgba(73, 94, 87, 0.15)",
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
              </Box>

              {/* Submit Button */}
              <Box textAlign="center">
                <Zoom in={true} timeout={1000} style={{ transitionDelay: "900ms" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!formik.isValid || isSubmitting}
                    size="large"
                    startIcon={isSubmitting ? null : <CheckCircle />}
                    sx={{
                      py: { xs: 1, md: 2 },
                      px: { xs: 3, md: 4 },
                      borderRadius: 2,
                      background: isSubmitting
                        ? "#999"
                        : "#495e57",
                      fontWeight: 600,
                      fontSize: { xs: "0.9rem", md: "1.1rem" },
                      textTransform: "none",
                      minWidth: { xs: "auto", md: 200 },
                      width: { xs: "100%", sm: "auto" },
                      maxWidth: { xs: "280px", sm: "none" },
                      mx: { xs: "auto", sm: 0 },
                      boxShadow: "0 4px 12px rgba(73, 94, 87, 0.3)",
                      "&:hover": {
                        background: isSubmitting ? "#999" : "#f4ce14",
                        color: "#495e57",
                        boxShadow: "0 6px 16px rgba(73, 94, 87, 0.4)",
                      },
                      "&:disabled": {
                        background: "#ccc",
                        color: "#666",
                      },
                    }}
                  >
                    {isSubmitting ? (
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
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
                        Booking...
                      </Box>
                    ) : (
                      "Reserve Table"
                    )}
                  </Button>
                </Zoom>
              </Box>
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
        </Snackbar>
      </Container>
    </Box>
  );
}

export default BookingForm;