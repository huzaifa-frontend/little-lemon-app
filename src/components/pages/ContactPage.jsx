import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Fade,
  Zoom,
  Slide,
  InputAdornment,
  Snackbar,
  Alert,
  FormHelperText,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import {
  Email,
  Phone,
  LocationOn,
  AccessTime,
  Send,
  Person,
  Message,
  CheckCircle,
  ErrorOutline,
} from "@mui/icons-material";

// Optimized animations with reduced complexity
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { background-position: -100px 0; }
  100% { background-position: calc(100px + 100%) 0; }
`;

// Optimized Styled Components
const ContentSection = styled(Box)({
  padding: "4rem 0",
  position: "relative",
});

const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  WebkitTapHighlightColor: "transparent",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.15)",
  },
});

const IconWrapper = styled(Box)({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #f4ce14, #ffea61)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 1.5rem",
  boxShadow: "0 8px 24px rgba(244, 206, 20, 0.3)",
  animation: `${floatAnimation} 4s ease-in-out infinite`,
  "& svg": {
    fontSize: "2.5rem",
    color: "#495e57",
  },
});

const ContactFormCard = styled(Card)({
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  border: "1px solid rgba(244, 206, 20, 0.2)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #f4ce14, #ffea61, #f4ce14)",
    backgroundSize: "200% 100%",
    animation: `${shimmer} 3s ease-in-out infinite`,
  },
});

const StyledTextField = styled(TextField)(({ error }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "rgba(248, 249, 250, 0.8)",
    backdropFilter: "blur(10px)",
    border: `2px solid ${error ? "#ff5252" : "transparent"}`,
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(248, 249, 250, 1)",
      borderColor: error ? "#ff5252" : "rgba(244, 206, 20, 0.5)",
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      borderColor: error ? "#ff5252" : "#f4ce14",
      boxShadow: `0 4px 12px ${
        error ? "rgba(255, 82, 82, 0.2)" : "rgba(244, 206, 20, 0.2)"
      }`,
    },
    "& fieldset": {
      border: "none",
    },
  },
  "& .MuiInputLabel-root": {
    color: error ? "#ff5252" : "#666",
    "&.Mui-focused": {
      color: error ? "#ff5252" : "#495e57",
    },
  },
}));

const SubmitButton = styled(Button)({
  background: "linear-gradient(135deg, #f4ce14 0%, #e6b800 100%)",
  color: "#495e57",
  padding: "1.2rem 3rem",
  borderRadius: "12px",
  fontSize: "1.1rem",
  fontWeight: 700,
  textTransform: "none",
  boxShadow: "0 8px 24px rgba(244, 206, 20, 0.3)",
  transition: "all 0.3s ease",
  WebkitTapHighlightColor: "transparent",
  "&:hover": {
    background: "linear-gradient(135deg, #e6b800 0%, #d4a900 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 12px 32px rgba(244, 206, 20, 0.4)",
  },
  "&:disabled": {
    opacity: 0.7,
    transform: "none",
  },
});

const HoursChip = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "0.25rem",
  padding: "1rem 1.5rem",
  backgroundColor: "rgba(244, 206, 20, 0.1)",
  border: "1px solid rgba(244, 206, 20, 0.3)",
  borderRadius: "20px",
  color: "#495e57",
  fontSize: "0.9rem",
  fontWeight: 600,
  margin: "0.5rem",
  minWidth: "160px",
  textAlign: "center",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "rgba(244, 206, 20, 0.2)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  "& .day": {
    fontWeight: 700,
    fontSize: "0.95rem",
    color: "#495e57",
  },
  "& .hours": {
    fontWeight: 500,
    fontSize: "0.85rem",
    color: "#f4ce14",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
  },
});

const OperatingHourRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 0",
  borderBottom: "1px solid rgba(244, 206, 20, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(244, 206, 20, 0.05)",
    transform: "translateX(4px)",
  },
  "&:last-child": {
    borderBottom: "none",
  },
});

// Contact information data
const contactInfo = [
  {
    icon: <Email />,
    title: "Email Us",
    value: "info@littlelemon.com",
    subtitle: "We'll respond within 24 hours",
    link: "mailto:info@littlelemon.com",
  },
  {
    icon: <Phone />,
    title: "Call Us",
    value: "+1 (123) 456-7890",
    subtitle: "Mon-Sun: 11:00 AM - 10:00 PM",
    link: "tel:+1-123-456-7890",
  },
  {
    icon: <LocationOn />,
    title: "Visit Us",
    value: "123 Main St, Chicago, IL",
    subtitle: "Downtown Chicago Location",
    link: "https://maps.google.com/?q=123+Main+St,+Chicago,+IL",
  },
];

const operatingHours = [
  { day: "Monday - Thursday", hours: "11:00 AM - 9:00 PM" },
  { day: "Friday - Saturday", hours: "11:00 AM - 10:00 PM" },
  { day: "Sunday", hours: "12:00 PM - 8:00 PM" },
];

// Validation functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[\d\s\(\)\-\.]{10,}$/;
  return phone === "" || phoneRegex.test(phone);
};

const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s'-]+$/; // Only letters, spaces, hyphens, and apostrophes
  return name.trim().length >= 2 && nameRegex.test(name.trim());
};

const validateSubject = (subject) => {
  return subject.trim().length >= 3 && subject.trim().length <= 100;
};

function ContactPage() {
  // Form state with validation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Animation states
  const [animateCards, setAnimateCards] = useState(false);
  const contactRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animateCards) {
            setAnimateCards(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: "50px" }
    );

    const currentRef = contactRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animateCards]);

  // Optimized input change handler with validation
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Update form data
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error for this field if it exists
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  // Validation function
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!validateName(formData.name)) {
      newErrors.name =
        "Name must be at least 2 characters long and contain only letters";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!validateSubject(formData.subject)) {
      newErrors.subject = "Subject must be 3-100 characters long";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    return newErrors;
  }, [formData]);

  // Optimized form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        setSnackbar({
          open: true,
          message: "Please fix the errors in the form",
          severity: "error",
        });
        return;
      }

      setIsSubmitting(true);
      setErrors({});

      try {
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setSnackbar({
          open: true,
          message:
            "Thank you! Your message has been sent successfully. We'll get back to you soon!",
          severity: "success",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message:
            "Sorry, there was an error sending your message. Please try again.",
          severity: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm]
  );

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  // Memoized components for better performance
  const contactCards = useMemo(
    () =>
      contactInfo.map((info, index) => (
        <Grid item xs={12} md={4} key={info.title}>
          <Zoom
            in={animateCards}
            timeout={800}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <StyledCard
              component="a"
              href={info.link}
              sx={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <IconWrapper style={{ animationDelay: `${index * 0.3}s` }}>
                  {info.icon}
                </IconWrapper>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: "#495e57",
                    fontSize: {
                      xs: "1.25rem", // Mobile: 20px
                      sm: "1.35rem", // Small: 21.6px
                      md: "1.45rem", // Medium: 23.2px
                      lg: "1.5rem", // Large: 24px (default h5)
                    },
                  }}
                >
                  {info.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#f4ce14",
                    fontWeight: 700,
                    mb: 1,
                    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                    fontSize: {
                      xs: "1rem", // Mobile: 16px
                      sm: "1.1rem", // Small: 17.6px
                      md: "1.2rem", // Medium: 19.2px
                      lg: "1.25rem", // Large: 20px (default h6)
                    },
                  }}
                >
                  {info.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#666", lineHeight: 1.6 }}
                >
                  {info.subtitle}
                </Typography>
              </CardContent>
            </StyledCard>
          </Zoom>
        </Grid>
      )),
    [animateCards]
  );

  return (
    <div className="contact-page full-width-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle">
            We'd love to hear from you. Reach out for reservations, questions,
            or just to say hello!
          </p>
        </div>
      </div>

      {/* Contact Information Cards */}
      <ContentSection ref={contactRef}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#495e57",
                mb: 2,
                fontSize: {
                  xs: "2rem", // Mobile: 32px
                  sm: "2.25rem", // Small: 36px
                  md: "2.5rem", // Medium: 40px
                  lg: "3rem", // Large: 48px (default h3)
                },
                animation: `${fadeInUp} 0.8s ease-out`,
              }}
            >
              Contact Information
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#666",
                maxWidth: "600px",
                mx: "auto",
                fontSize: {
                  xs: "1rem", // Mobile: 16px
                  sm: "1.1rem", // Small: 17.6px
                  md: "1.2rem", // Medium: 19.2px
                  lg: "1.25rem", // Large: 20px (default h6)
                },
                animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
              }}
            >
              Reach Out to Little Lemon Anytime
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ justifyContent: "center" }}>
            {contactCards}
          </Grid>
        </Container>
      </ContentSection>

      {/* Contact Form Section */}
      <ContentSection
        sx={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#495e57",
                mb: 2,
                fontSize: {
                  xs: "2rem", // Mobile: 32px
                  sm: "2.25rem", // Small: 36px
                  md: "2.5rem", // Medium: 40px
                  lg: "3rem", // Large: 48px (default h3)
                },
                animation: `${fadeInUp} 0.8s ease-out`,
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#666",
                maxWidth: "600px",
                mx: "auto",
                fontSize: {
                  xs: "1rem", // Mobile: 16px
                  sm: "1.1rem", // Small: 17.6px
                  md: "1.2rem", // Medium: 19.2px
                  lg: "1.25rem", // Large: 20px (default h6)
                },
                animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
              }}
            >
              Send us a message and we'll get back to you soon
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ justifyContent: "center" }}>
            {/* Contact Form Card */}
            <Grid item xs={12} md={6} lg={4}>
              <Fade in timeout={1000}>
                <ContactFormCard
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{
                      p: 4,
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Box textAlign="center" mb={4}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: "#495e57",
                          mb: 2,
                          fontSize: {
                            xs: "1.25rem", // Mobile: 20px
                            sm: "1.35rem", // Small: 21.6px
                            md: "1.45rem", // Medium: 23.2px
                            lg: "1.5rem", // Large: 24px
                          },
                        }}
                      >
                        Send Us a Message
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          lineHeight: 1.6,
                          fontSize: {
                            xs: "0.85rem", // Mobile: 13.6px
                            sm: "0.9rem", // Small: 14.4px
                            md: "0.95rem", // Medium: 15.2px
                            lg: "1rem", // Large: 16px
                          },
                        }}
                      >
                        Fill out the form below and we'll get back to you as
                        soon as possible
                      </Typography>
                    </Box>

                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      sx={{
                        width: "100%",
                        maxWidth: "400px",
                        mx: "auto",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        <Box>
                          <StyledTextField
                            fullWidth
                            label="Your Name *"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            error={!!errors.name}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person
                                    sx={{
                                      color: errors.name
                                        ? "#ff5252"
                                        : "#f4ce14",
                                    }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                          {errors.name && (
                            <FormHelperText error sx={{ ml: 1, mt: 0.5 }}>
                              <ErrorOutline
                                sx={{
                                  fontSize: "1rem",
                                  mr: 0.5,
                                  verticalAlign: "middle",
                                }}
                              />
                              {errors.name}
                            </FormHelperText>
                          )}
                        </Box>

                        <Box>
                          <StyledTextField
                            fullWidth
                            label="Email Address *"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            error={!!errors.email}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Email
                                    sx={{
                                      color: errors.email
                                        ? "#ff5252"
                                        : "#f4ce14",
                                    }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                          {errors.email && (
                            <FormHelperText error sx={{ ml: 1, mt: 0.5 }}>
                              <ErrorOutline
                                sx={{
                                  fontSize: "1rem",
                                  mr: 0.5,
                                  verticalAlign: "middle",
                                }}
                              />
                              {errors.email}
                            </FormHelperText>
                          )}
                        </Box>

                        <Box>
                          <StyledTextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            error={!!errors.phone}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Phone
                                    sx={{
                                      color: errors.phone
                                        ? "#ff5252"
                                        : "#f4ce14",
                                    }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                          {errors.phone && (
                            <FormHelperText error sx={{ ml: 1, mt: 0.5 }}>
                              <ErrorOutline
                                sx={{
                                  fontSize: "1rem",
                                  mr: 0.5,
                                  verticalAlign: "middle",
                                }}
                              />
                              {errors.phone}
                            </FormHelperText>
                          )}
                        </Box>

                        <Box>
                          <StyledTextField
                            fullWidth
                            label="Subject *"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            error={!!errors.subject}
                            helperText={`${formData.subject.length}/100 characters`}
                            inputProps={{ maxLength: 100 }}
                          />
                          {errors.subject && (
                            <FormHelperText error sx={{ ml: 1, mt: 0.5 }}>
                              <ErrorOutline
                                sx={{
                                  fontSize: "1rem",
                                  mr: 0.5,
                                  verticalAlign: "middle",
                                }}
                              />
                              {errors.subject}
                            </FormHelperText>
                          )}
                        </Box>

                        <Box>
                          <StyledTextField
                            fullWidth
                            label="Your Message *"
                            name="message"
                            multiline
                            rows={6}
                            value={formData.message}
                            onChange={handleInputChange}
                            error={!!errors.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  sx={{ alignSelf: "flex-start", mt: 1 }}
                                >
                                  <Message
                                    sx={{
                                      color: errors.message
                                        ? "#ff5252"
                                        : "#f4ce14",
                                    }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                          {errors.message && (
                            <FormHelperText error sx={{ ml: 1, mt: 0.5 }}>
                              <ErrorOutline
                                sx={{
                                  fontSize: "1rem",
                                  mr: 0.5,
                                  verticalAlign: "middle",
                                }}
                              />
                              {errors.message}
                            </FormHelperText>
                          )}
                        </Box>

                        <Box textAlign="center" mt={2}>
                          <SubmitButton
                            type="submit"
                            disabled={isSubmitting}
                            fullWidth
                            sx={{
                              maxWidth: "300px",
                              py: 1.5,
                              fontSize: "1.1rem",
                            }}
                            startIcon={
                              isSubmitting ? (
                                <Box
                                  sx={{
                                    width: "20px",
                                    height: "20px",
                                    border: "2px solid transparent",
                                    borderTop: "2px solid #495e57",
                                    borderRadius: "50%",
                                    animation: "spin 1s linear infinite",
                                  }}
                                />
                              ) : (
                                <Send />
                              )
                            }
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </SubmitButton>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </ContactFormCard>
              </Fade>
            </Grid>

            {/* Operating Hours Card */}
            <Grid item xs={12} md={6} lg={4}>
              <Fade in timeout={1200}>
                <StyledCard
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{
                      p: 3,
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mb={3}
                    >
                      <AccessTime
                        sx={{ color: "#f4ce14", mr: 2, fontSize: "2.5rem" }}
                      />
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: "#495e57",
                          fontSize: {
                            xs: "1.25rem", // Mobile: 20px
                            sm: "1.35rem", // Small: 21.6px
                            md: "1.45rem", // Medium: 23.2px
                            lg: "1.5rem", // Large: 24px
                          },
                        }}
                      >
                        Operating Hours
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        flexGrow: 1,
                        alignContent: "flex-start",
                      }}
                    >
                      {operatingHours.map((schedule, index) => (
                        <HoursChip key={schedule.day}>
                          <Box className="day">{schedule.day}</Box>
                          <Box className="hours">{schedule.hours}</Box>
                        </HoursChip>
                      ))}
                    </Box>
                  </CardContent>
                </StyledCard>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </ContentSection>

      {/* Map Section */}
      <ContentSection>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#495e57",
                mb: 2,
                fontSize: {
                  xs: "2rem", // Mobile: 32px
                  sm: "2.25rem", // Small: 36px
                  md: "2.5rem", // Medium: 40px
                  lg: "3rem", // Large: 48px (default h3)
                },
              }}
            >
              Find Us
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#666",
                maxWidth: "600px",
                mx: "auto",
                fontSize: {
                  xs: "1rem", // Mobile: 16px
                  sm: "1.1rem", // Small: 17.6px
                  md: "1.2rem", // Medium: 19.2px
                  lg: "1.25rem", // Large: 20px (default h6)
                },
              }}
            >
              Located in the heart of downtown Chicago
            </Typography>
          </Box>

          <Fade in timeout={1000}>
            <Box
              sx={{
                width: "100%",
                height: "400px",
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                border: "3px solid rgba(244, 206, 20, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.1234567890!2d-87.6244212!3d41.8755616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2ca55810a493%3A0x4700ddf60fcfad4!2s123%20N%20State%20St%2C%20Chicago%2C%20IL%2060602%2C%20USA!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Little Lemon Restaurant Location"
              />
            </Box>
          </Fade>
        </Container>
      </ContentSection>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            fontSize: "1rem",
            "& .MuiAlert-icon": {
              fontSize: "1.5rem",
            },
          }}
          iconMapping={{
            success: <CheckCircle fontSize="inherit" />,
            error: <ErrorOutline fontSize="inherit" />,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          overflow: hidden;
        }

        .hero-section {
          background: linear-gradient(135deg, #495e57 0%, #3a4c47 100%);
          position: relative;
          overflow: hidden;
          min-height: 40vh;
          display: flex;
          align-items: center;
          color: white;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
          padding: 0;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
              circle at 25% 25%,
              rgba(244, 206, 20, 0.1) 0%,
              transparent 25%
            ),
            radial-gradient(
              circle at 75% 75%,
              rgba(244, 206, 20, 0.08) 0%,
              transparent 25%
            );
          pointer-events: none;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          animation: fadeInUp 1s ease-out;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
          animation: fadeInUp 1s ease-out 0.3s both;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .hero-content {
            padding: 0 15px;
          }
        }

        @media (max-width: 400px) {
          .hero-content {
            padding: 0 10px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: 35vh;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            min-height: 35vh;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 400px) {
          .hero-section {
            min-height: 30vh;
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            position: relative;
            left: 0;
            right: 0;
          }

          .hero-title {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
          }

          .hero-subtitle {
            font-size: 1rem;
            padding: 0 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default ContactPage;
