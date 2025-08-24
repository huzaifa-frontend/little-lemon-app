import React, { useEffect, useState } from "react";
import {
  Snackbar,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Fade,
  Slide,
  Zoom,
  Dialog,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  CheckCircle,
  Restaurant,
  Schedule,
  People,
  Celebration,
  Home,
  Share,
  Print,
  Close,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Print-only styles
const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    .print-area, .print-area * {
      visibility: visible;
    }
    .print-area {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 20px;
      background: white !important;
    }
    .no-print {
      display: none !important;
    }
    @page {
      margin: 0.5in;
    }
  }
`;

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => (
    <Box
      key={i}
      className="no-print"
      sx={{
        position: "absolute",
        width: "6px",
        height: "6px",
        backgroundColor: "#F4CE14",
        borderRadius: "50%",
        animation: `float${i % 3} ${3 + (i % 3)}s ease-in-out infinite`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: 0.7,
        "@keyframes float0": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(180deg)" },
        },
        "@keyframes float1": {
          "0%, 100%": { transform: "translateX(0px) rotate(0deg)" },
          "50%": { transform: "translateX(20px) rotate(180deg)" },
        },
        "@keyframes float2": {
          "0%, 100%": { transform: "translate(0px, 0px) rotate(0deg)" },
          "33%": { transform: "translate(10px, -10px) rotate(120deg)" },
          "66%": { transform: "translate(-10px, 10px) rotate(240deg)" },
        },
      }}
    />
  ));

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {particles}
    </Box>
  );
};

// Enhanced Print Layout Component that matches the main UI
const PrintLayout = ({ bookingData }) => (
  <Box
    className="print-area"
    sx={{
      display: "none",
      "@media print": {
        display: "block !important",
      },
    }}
  >
    <Box sx={{ maxWidth: 500, mx: "auto", p: 2, textAlign: "center" }}>
      {/* Compact Logo Section */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 0.5,
            color: "#495E57",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          🍋 Little Lemon
        </Typography>
      </Box>

      {/* Compact Success Section */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#495E57", mb: 0.5 }}
        >
          Booking Confirmed!
        </Typography>
        <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
          Thank you for choosing Little Lemon
        </Typography>
      </Box>

      {/* Compact Booking Details */}
      <Box
        sx={{
          backgroundColor: "rgba(73, 94, 87, 0.05)",
          borderRadius: "8px",
          border: "2px solid #F4CE14",
          p: 2,
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#495E57",
            mb: 2,
            borderBottom: "2px solid #F4CE14",
            pb: 0.5,
            fontSize: "1.1rem",
          }}
        >
          Reservation Details
        </Typography>

        {[
          { icon: <Schedule />, label: "Date", value: bookingData.date },
          { icon: <Restaurant />, label: "Time", value: bookingData.time },
          {
            icon: <People />,
            label: "Guests",
            value: `${bookingData.guests} ${
              bookingData.guests === 1 ? "Guest" : "Guests"
            }`,
          },
          {
            icon: <Celebration />,
            label: "Occasion",
            value: bookingData.occasion,
          },
        ].map((detail, index) => (
          <Box
            key={detail.label}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 1,
              px: 1.5,
              mb: 0.5,
              backgroundColor: "white",
              borderRadius: "6px",
              border: "1px solid rgba(73, 94, 87, 0.1)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#495E57",
                  borderRadius: "50%",
                  color: "#F4CE14",
                }}
              >
                {React.cloneElement(detail.icon, { sx: { fontSize: 14 } })}
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#495E57", fontSize: "0.9rem" }}
              >
                {detail.label}:
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: "#333", fontSize: "0.9rem" }}
            >
              {detail.value}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Compact Footer */}
      <Box
        sx={{
          borderTop: "2px solid #F4CE14",
          pt: 1.5,
          textAlign: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#495E57",
            fontWeight: 600,
            mb: 0.5,
            fontSize: "0.9rem",
          }}
        >
          We look forward to serving you!
        </Typography>
        <Typography variant="body2" sx={{ color: "#666", fontSize: "0.85rem" }}>
          Little Lemon Restaurant - Where every meal is a celebration
        </Typography>
      </Box>
    </Box>
  </Box>
);

function ConfirmedBooking() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Get booking data from location state (from the form)
  const bookingData = location.state || {
    date: "Not Provided",
    time: "Not Provided",
    guests: "Not Provided",
    occasion: "Not Specified",
  };

  // Format the booking data for better display
  const formatBookingData = (data) => {
    const formatted = { ...data };

    // Format date if it exists
    if (data.date && data.date !== "Not Provided") {
      const dateObj = new Date(data.date);
      formatted.date = dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    // Format time if it exists
    if (data.time && data.time !== "Not Provided") {
      formatted.time = data.time;
    }

    // Format guests
    if (data.guests && data.guests !== "Not Provided") {
      formatted.guests = Number(data.guests);
    }

    // Format occasion
    if (data.occasion && data.occasion !== "Not Specified") {
      formatted.occasion = data.occasion;
    }

    return formatted;
  };

  const formattedBookingData = formatBookingData(bookingData);

  useEffect(() => {
    // Inject print styles
    const style = document.createElement("style");
    style.textContent = printStyles;
    document.head.appendChild(style);

    // Staggered animation sequence
    const timeouts = [
      setTimeout(() => setAnimationStep(1), 300),
      setTimeout(() => setAnimationStep(2), 600),
      setTimeout(() => setAnimationStep(3), 900),
      setTimeout(() => setOpenSnackbar(true), 1200),
    ];

    return () => {
      timeouts.forEach(clearTimeout);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleShare = () => {
    setOpenShareDialog(true);
  };

  const handleSocialShare = (platform) => {
    const shareText = `Just booked a table at Little Lemon! 🍋 Date: ${formattedBookingData.date}, Time: ${formattedBookingData.time}`;
    const shareUrl = window.location.href;

    let url;
    switch (platform) {
      case "Facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}&quote=${encodeURIComponent(shareText)}`;
        break;
      case "Twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "WhatsApp":
        url = `https://wa.me/?text=${encodeURIComponent(
          shareText + " " + shareUrl
        )}`;
        break;
      case "Email":
        url = `mailto:?subject=My Little Lemon Reservation&body=${encodeURIComponent(
          shareText + "\n\n" + shareUrl
        )}`;
        break;
      default:
        return;
    }

    window.open(url, "_blank", "width=600,height=400");
    setOpenShareDialog(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const bookingDetails = [
    {
      icon: <Schedule />,
      label: "Date",
      value: formattedBookingData.date || "Not Provided",
    },
    {
      icon: <Restaurant />,
      label: "Time",
      value: formattedBookingData.time || "Not Provided",
    },
    {
      icon: <People />,
      label: "Guests",
      value: formattedBookingData.guests
        ? `${formattedBookingData.guests} ${
            formattedBookingData.guests === 1 ? "Guest" : "Guests"
          }`
        : "Not Provided",
    },
    {
      icon: <Celebration />,
      label: "Occasion",
      value: formattedBookingData.occasion || "Not Specified",
    },
  ];

  return (
    <>
      {/* Print Layout - Hidden on Screen */}
      <PrintLayout bookingData={formattedBookingData} />

      {/* Screen Layout with fixed background */}
      <Box
        className="no-print"
        sx={{
          minHeight: "100vh",
          width: "100vw",
          background: "linear-gradient(135deg, #6c9a8b 0%, #2c3e50 100%)",
          position: "relative",
          overflow: "hidden",
          margin: 0,
          padding: 0,
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
        }}
      >
        <FloatingParticles />

        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            py: { xs: 2, md: 4 },
            px: { xs: 1, sm: 2, md: 3 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Fade in timeout={1000}>
            <Card
              sx={{
                maxWidth: { xs: "95vw", sm: 500, md: 600 },
                width: "100%",
                borderRadius: { xs: "16px", md: "24px" },
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                overflow: "visible",
                position: "relative",
                mx: { xs: "auto", md: 0 },
              }}
            >
              {/* Success Icon */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: { xs: -3, md: -4 },
                  mb: { xs: 1, md: 2 },
                }}
              >
                <Zoom in={animationStep >= 1} timeout={800}>
                  <Avatar
                    sx={{
                      width: { xs: 60, md: 80 },
                      height: { xs: 60, md: 80 },
                      backgroundColor: "#4caf50",
                      boxShadow: "0 8px 24px rgba(76, 175, 80, 0.3)",
                      animation: "pulse 2s ease-in-out infinite",
                      "@keyframes pulse": {
                        "0%": {
                          transform: "scale(1)",
                          boxShadow: "0 8px 24px rgba(76, 175, 80, 0.3)",
                        },
                        "50%": {
                          transform: "scale(1.05)",
                          boxShadow: "0 12px 32px rgba(76, 175, 80, 0.4)",
                        },
                        "100%": {
                          transform: "scale(1)",
                          boxShadow: "0 8px 24px rgba(76, 175, 80, 0.3)",
                        },
                      },
                    }}
                  >
                    <CheckCircle
                      sx={{ fontSize: { xs: 30, md: 40 }, color: "white" }}
                    />
                  </Avatar>
                </Zoom>
              </Box>

              <CardContent
                sx={{
                  textAlign: "center",
                  px: { xs: 2, md: 4 },
                  pb: { xs: 2, md: 4 },
                }}
              >
                {/* Main Heading */}
                <Slide direction="down" in={animationStep >= 2} timeout={600}>
                  <Box>
                    <Typography
                      variant="h3"
                      gutterBottom
                      sx={{
                        fontWeight: 800,
                        color: "#495E57",
                        mb: 1,
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                        lineHeight: { xs: 1.2, md: 1 },
                      }}
                    >
                      Booking Confirmed!
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        color: "#666",
                        mb: { xs: 2, md: 3 },
                        fontWeight: 400,
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
                        lineHeight: { xs: 1.3, md: 1.4 },
                        px: { xs: 1, md: 0 },
                      }}
                    >
                      Thank you for choosing{" "}
                      <span style={{ color: "#495E57", fontWeight: "bold" }}>
                        Little Lemon
                      </span>
                      <br />
                      We can't wait to serve you!
                    </Typography>
                  </Box>
                </Slide>

                {/* Booking Details */}
                <Fade in={animationStep >= 3} timeout={800}>
                  <Box>
                    <Chip
                      label="Reservation Details"
                      sx={{
                        mb: { xs: 2, md: 3 },
                        backgroundColor: "#F4CE14",
                        color: "#495E57",
                        fontWeight: "bold",
                        fontSize: { xs: "0.8rem", md: "0.9rem" },
                        px: { xs: 1, md: 2 },
                        height: { xs: 28, md: 32 },
                      }}
                    />

                    <Box sx={{ mb: { xs: 3, md: 4 } }}>
                      {bookingDetails.map((detail, index) => (
                        <Slide
                          key={detail.label}
                          direction="up"
                          in={animationStep >= 3}
                          timeout={600 + index * 100}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              py: { xs: 1.5, md: 2 },
                              px: { xs: 2, md: 3 },
                              mb: 1,
                              backgroundColor: "rgba(73, 94, 87, 0.05)",
                              borderRadius: { xs: "8px", md: "12px" },
                              border: "1px solid rgba(73, 94, 87, 0.1)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                backgroundColor: "rgba(73, 94, 87, 0.1)",
                                transform: "translateX(4px)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: { xs: 1.5, md: 2 },
                              }}
                            >
                              <Avatar
                                sx={{
                                  width: { xs: 28, md: 32 },
                                  height: { xs: 28, md: 32 },
                                  backgroundColor: "#495E57",
                                  color: "#F4CE14",
                                }}
                              >
                                {React.cloneElement(detail.icon, {
                                  sx: { fontSize: { xs: 16, md: 20 } },
                                })}
                              </Avatar>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 600,
                                  color: "#495E57",
                                  fontSize: { xs: "0.85rem", md: "1rem" },
                                }}
                              >
                                {detail.label}
                              </Typography>
                            </Box>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 500,
                                color: "#333",
                                fontSize: {
                                  xs: "0.75rem",
                                  sm: "0.85rem",
                                  md: "1rem",
                                },
                                textAlign: "right",
                                maxWidth: { xs: "55%", sm: "60%" },
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                lineHeight: { xs: 1.2, md: 1.4 },
                              }}
                            >
                              {detail.value}
                            </Typography>
                          </Box>
                        </Slide>
                      ))}
                    </Box>

                    <Divider sx={{ my: { xs: 2, md: 3 } }} />

                    {/* Action Buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: { xs: 1.5, md: 2 },
                        justifyContent: "center",
                        flexWrap: "wrap",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={handleGoHome}
                        startIcon={
                          <Home sx={{ fontSize: { xs: 18, md: 20 } }} />
                        }
                        sx={{
                          backgroundColor: "#495E57",
                          color: "#F4CE14",
                          fontWeight: "bold",
                          px: { xs: 3, md: 4 },
                          py: { xs: 1.2, md: 1.5 },
                          borderRadius: { xs: "8px", md: "12px" },
                          fontSize: { xs: "0.9rem", md: "1rem" },
                          textTransform: "none",
                          boxShadow: "0 8px 24px rgba(73, 94, 87, 0.3)",
                          minWidth: { xs: "200px", sm: "auto" },
                          "&:hover": {
                            backgroundColor: "#364643",
                            transform: "translateY(-2px)",
                            boxShadow: "0 12px 32px rgba(73, 94, 87, 0.4)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        Return Home
                      </Button>

                      <Box sx={{ display: "flex", gap: { xs: 1.5, md: 2 } }}>
                        <Button
                          variant="outlined"
                          onClick={handleShare}
                          startIcon={
                            <Share sx={{ fontSize: { xs: 16, md: 18 } }} />
                          }
                          sx={{
                            borderColor: "#495E57",
                            color: "#495E57",
                            fontWeight: "bold",
                            px: { xs: 2.5, md: 3 },
                            py: { xs: 1.2, md: 1.5 },
                            borderRadius: { xs: "8px", md: "12px" },
                            fontSize: { xs: "0.85rem", md: "1rem" },
                            textTransform: "none",
                            "&:hover": {
                              backgroundColor: "rgba(73, 94, 87, 0.1)",
                              transform: "translateY(-2px)",
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          Share
                        </Button>

                        <IconButton
                          onClick={handlePrint}
                          sx={{
                            color: "#495E57",
                            border: "2px solid #495E57",
                            borderRadius: { xs: "8px", md: "12px" },
                            width: { xs: 40, md: 48 },
                            height: { xs: 40, md: 48 },
                            "&:hover": {
                              backgroundColor: "rgba(73, 94, 87, 0.1)",
                              transform: "translateY(-2px)",
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          <Print sx={{ fontSize: { xs: 18, md: 20 } }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Fade>
              </CardContent>
            </Card>
          </Fade>
        </Container>

        {/* Success Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{
              width: "100%",
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Reservation confirmed successfully!
          </Alert>
        </Snackbar>

        {/* Share Dialog */}
        <Dialog
          open={openShareDialog}
          onClose={() => setOpenShareDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "16px",
              padding: 2,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#495E57" }}
            >
              Share Your Reservation
            </Typography>
            <IconButton onClick={() => setOpenShareDialog(false)}>
              <Close />
            </IconButton>
          </Box>

          <DialogContent sx={{ pt: 0 }}>
            <Typography variant="body1" sx={{ mb: 3, color: "#666" }}>
              Share your Little Lemon reservation with friends and family!
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {["Facebook", "Twitter", "WhatsApp", "Email"].map((platform) => (
                <Button
                  key={platform}
                  variant="outlined"
                  onClick={() => handleSocialShare(platform)}
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 3,
                    borderColor: "#495E57",
                    color: "#495E57",
                    "&:hover": {
                      transform: "scale(1.05)",
                      backgroundColor: "rgba(73, 94, 87, 0.1)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {platform}
                </Button>
              ))}
            </Box>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => setOpenShareDialog(false)}
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                backgroundColor: "#F4CE14",
                color: "#495E57",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#E6B800",
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default ConfirmedBooking;
