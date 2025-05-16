import React, { useEffect, useState } from "react";
import {
  Snackbar,
  Button,
  Container,
  Typography,
  Box,
  Grow,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useLocation, useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ConfirmedBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { date, time, guests, occasion } = location.state || {};

  useEffect(() => {
    if (location.state?.showSnackbar) {
      setOpenSnackbar(true);
    }
  }, [location.state]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Grow in timeout={700}>
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          mt: 8,
          p: 4,
          backgroundColor: "#f9f9f9",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
          🎉 Booking Confirmed!
        </Typography>

        <Typography variant="h6" gutterBottom>
          Thank you for booking with <strong>Little Lemon</strong>! <br />
          We look forward to hosting you.
        </Typography>

        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="body1" sx={{ fontSize: "1.2rem", mb: 1 }}>
            📅 <strong>Date:</strong> {date || "Not Provided"}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.2rem", mb: 1 }}>
            ⏰ <strong>Time:</strong> {time || "Not Provided"}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.2rem", mb: 1 }}>
            👥 <strong>Guests:</strong> {guests || "Not Provided"}
          </Typography>
          {occasion && (
            <Typography variant="body1" sx={{ fontSize: "1.2rem", mb: 1 }}>
              🎈 <strong>Occasion:</strong> {occasion}
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          onClick={handleGoHome}
          sx={{
            mt: 2,
            backgroundColor: "#495E57",
            color: "#FACE14",
            fontWeight: "bold",
            fontSize: "1rem",
            padding: "10px 24px",
            borderRadius: "12px",
            "&:hover": {
              backgroundColor: "#364643",
            },
          }}
        >
          Return to Homepage
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Booking submitted successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Grow>
  );
}

export default ConfirmedBooking;
