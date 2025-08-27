import React, { useState, useEffect, useCallback } from "react";
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
  Avatar,
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Phone,
  LocationOn,
  Edit,
  Save,
  Cancel,
  Security,
  Notifications,
  History,
  Favorite,
  Restaurant,
  Star,
  LocalDining,
  AccessTime,
  ExitToApp,
  PersonAdd,
  Login,
  CheckCircle,
  ErrorOutline,
  Badge,
  Timeline,
  Wc,
} from "@mui/icons-material";

// Animations
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

// Generate random user stats for new accounts
const generateRandomStats = () => {
  const currentYear = new Date().getFullYear();
  const memberSinceOptions = [2020, 2021, 2022, 2023, 2024];
  const memberSince =
    memberSinceOptions[Math.floor(Math.random() * memberSinceOptions.length)];

  return {
    totalOrders: Math.floor(Math.random() * 50) + 1, // 1-50 orders
    favoriteItems: Math.floor(Math.random() * 15) + 1, // 1-15 favorite items
    totalSpent: parseFloat((Math.random() * 800 + 50).toFixed(2)), // $50-$850
    memberSince: memberSince.toString(),
    loyaltyPoints: Math.floor(Math.random() * 2000) + 100, // 100-2100 points
  };
};

/**
 * Features implemented:
 * 1. Random user stats generation for each new account
 * 2. Case-insensitive email duplicate prevention
 * 3. Dynamic user stats loading and persistence
 * 4. Automatic stats generation for existing users without stats
 */

// Styled Components
const AuthCard = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  border: "1px solid rgba(244, 206, 20, 0.2)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  "@media (max-width: 768px)": {
    borderRadius: "20px",
  },
  "@media (max-width: 480px)": {
    borderRadius: "16px",
    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)",
  },
  "@media (max-width: 400px)": {
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
  },
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
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  border: "1px solid rgba(244, 206, 20, 0.2)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.15)",
  },
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "rgba(248, 249, 250, 0.8)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
    fontSize: "1rem",
    "@media (max-width: 768px)": {
      fontSize: "0.95rem",
      borderRadius: "10px",
    },
    "@media (max-width: 480px)": {
      fontSize: "0.9rem",
      borderRadius: "8px",
    },
    "@media (max-width: 400px)": {
      fontSize: "0.85rem",
    },
    "&:hover": {
      backgroundColor: "rgba(248, 249, 250, 1)",
      "& fieldset": {
        borderColor: "rgba(244, 206, 20, 0.5)",
      },
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      boxShadow: "0 4px 12px rgba(244, 206, 20, 0.2)",
    },
    "&.Mui-error": {
      "& fieldset": {
        borderColor: "#ff5252",
      },
      "&.Mui-focused": {
        boxShadow: "0 4px 12px rgba(255, 82, 82, 0.2)",
      },
    },
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.12)",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#666",
    fontSize: "1rem",
    "@media (max-width: 768px)": {
      fontSize: "0.95rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "0.9rem",
    },
    "@media (max-width: 400px)": {
      fontSize: "0.85rem",
    },
    "&.Mui-focused": {
      color: "#495e57",
    },
    "&.Mui-error": {
      color: "#ff5252",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#ff5252",
    fontSize: "0.875rem",
    marginTop: "8px",
    marginLeft: "14px",
    "@media (max-width: 480px)": {
      fontSize: "0.8rem",
    },
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: "#666",
    fontSize: "1rem",
    "&.Mui-focused": {
      color: "#495e57",
    },
    "&.Mui-error": {
      color: "#ff5252",
    },
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "12px",
    "& fieldset": {
      borderColor: "#e0e0e0",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "#f4ce14",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#495e57",
      borderWidth: "2px",
    },
    "&.Mui-error fieldset": {
      borderColor: "#ff5252",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#ff5252",
    fontSize: "0.875rem",
    marginTop: "8px",
    marginLeft: "14px",
  },
}));

const ActionButton = styled(Button)(({ variant }) => ({
  background:
    variant === "primary"
      ? "linear-gradient(135deg, #f4ce14 0%, #e6b800 100%)"
      : "linear-gradient(135deg, #495e57 0%, #3a4c47 100%)",
  color: variant === "primary" ? "#495e57" : "white",
  padding: "1rem 2rem",
  borderRadius: "12px",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  boxShadow:
    variant === "primary"
      ? "0 6px 20px rgba(244, 206, 20, 0.3)"
      : "0 6px 20px rgba(73, 94, 87, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    background:
      variant === "primary"
        ? "linear-gradient(135deg, #e6b800 0%, #d4a900 100%)"
        : "linear-gradient(135deg, #3a4c47 0%, #2d3a35 100%)",
    transform: "translateY(-2px)",
    boxShadow:
      variant === "primary"
        ? "0 8px 25px rgba(244, 206, 20, 0.4)"
        : "0 8px 25px rgba(73, 94, 87, 0.4)",
  },
  "&:disabled": {
    opacity: 0.7,
    transform: "none",
  },
  // Responsive styles
  "@media (max-width: 768px)": {
    padding: "0.9rem 1.8rem",
    fontSize: "0.95rem",
  },
  "@media (max-width: 480px)": {
    padding: "0.8rem 1.5rem",
    fontSize: "0.9rem",
    borderRadius: "10px",
  },
  "@media (max-width: 400px)": {
    padding: "0.7rem 1.2rem",
    fontSize: "0.85rem",
    borderRadius: "8px",
  },
}));

const StatCard = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: "1.5rem",
  background:
    "linear-gradient(135deg, rgba(244, 206, 20, 0.1) 0%, rgba(244, 206, 20, 0.05) 100%)",
  backdropFilter: "blur(20px)",
  borderRadius: "16px",
  border: "1px solid rgba(244, 206, 20, 0.2)",
  color: "#495e57",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(244, 206, 20, 0.2)",
  },
}));

// Validation functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const validateName = (name) => {
  const trimmedName = name.trim();
  if (trimmedName.length < 2) return false;
  // Check if name contains numbers
  if (/\d/.test(trimmedName)) return false;
  return true;
};

const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[\d\s\(\)\-\.]{10,}$/;
  return phone === "" || phoneRegex.test(phone);
};

function ProfilePage() {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
  });

  // UI states
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
  });

  // User stats (dynamic based on current user)
  const [userStats, setUserStats] = useState({
    totalOrders: 24,
    favoriteItems: 8,
    totalSpent: 456.78,
    memberSince: "2023",
    loyaltyPoints: 1250,
  });

  // Load user data on component mount
  useEffect(() => {
    const userData = window.localStorage?.getItem("littleLemonUser");
    const userSettings = window.localStorage?.getItem("littleLemonSettings");

    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
      setIsLoggedIn(true);
      setProfileForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        gender: user.gender || "",
      });

      // Load user stats or use default if not available
      if (user.stats) {
        setUserStats(user.stats);
      } else {
        // If existing user doesn't have stats, generate them and save
        const stats = generateRandomStats();
        const updatedUser = { ...user, stats };
        setCurrentUser(updatedUser);
        setUserStats(stats);
        window.localStorage?.setItem(
          "littleLemonUser",
          JSON.stringify(updatedUser)
        );

        // Update in users array as well
        const existingUsers = JSON.parse(
          window.localStorage?.getItem("littleLemonUsers") || "[]"
        );
        const updatedUsers = existingUsers.map((u) =>
          u.id === user.id ? updatedUser : u
        );
        window.localStorage?.setItem(
          "littleLemonUsers",
          JSON.stringify(updatedUsers)
        );
      }
    }

    if (userSettings) {
      setSettings(JSON.parse(userSettings));
    }
  }, []);

  // Scroll to top when ProfilePage mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  // Scroll to top when switching between login/signup forms
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [authMode]);

  // Handle input changes
  const handleInputChange = useCallback(
    (form, field) => (e) => {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;

      if (form === "login") {
        setLoginForm((prev) => ({ ...prev, [field]: value }));
      } else if (form === "signup") {
        setSignupForm((prev) => ({ ...prev, [field]: value }));
      } else if (form === "profile") {
        setProfileForm((prev) => ({ ...prev, [field]: value }));
      } else if (form === "password") {
        setPasswordForm((prev) => ({ ...prev, [field]: value }));
      } else if (form === "settings") {
        setSettings((prev) => ({ ...prev, [field]: value }));
      }

      // Clear errors
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  // Handle form switching with error clearing
  const handleSwitchToSignup = useCallback(() => {
    setAuthMode("signup");
    setErrors({});
  }, []);

  const handleSwitchToLogin = useCallback(() => {
    setAuthMode("login");
    setErrors({});
  }, []);

  // Validate forms
  const validateLoginForm = useCallback(() => {
    const newErrors = {};

    if (!validateEmail(loginForm.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!loginForm.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  }, [loginForm]);

  const validateSignupForm = useCallback(() => {
    const newErrors = {};

    if (!validateName(signupForm.firstName)) {
      newErrors.firstName =
        "First name must be at least 2 characters and cannot contain numbers";
    }

    if (!validateName(signupForm.lastName)) {
      newErrors.lastName =
        "Last name must be at least 2 characters and cannot contain numbers";
    }

    if (!validateEmail(signupForm.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validatePhone(signupForm.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!validatePassword(signupForm.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  }, [signupForm]);

  const validateProfileForm = useCallback(() => {
    const newErrors = {};

    if (!validateName(profileForm.firstName)) {
      newErrors.firstName =
        "First name must be at least 2 characters and cannot contain numbers";
    }

    if (!validateName(profileForm.lastName)) {
      newErrors.lastName =
        "Last name must be at least 2 characters and cannot contain numbers";
    }

    if (!validateEmail(profileForm.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validatePhone(profileForm.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    return newErrors;
  }, [profileForm]);

  // Handle login
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();

      const formErrors = validateLoginForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      setIsSubmitting(true);
      setErrors({});

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if user exists in localStorage
        const existingUsers = JSON.parse(
          window.localStorage?.getItem("littleLemonUsers") || "[]"
        );
        const user = existingUsers.find(
          (u) =>
            u.email.toLowerCase() === loginForm.email.toLowerCase() &&
            u.password === loginForm.password
        );

        if (user) {
          // Login successful
          setCurrentUser(user);
          setIsLoggedIn(true);

          // Scroll to top after successful login
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });

          // Load user stats or generate if not available
          if (user.stats) {
            setUserStats(user.stats);
          } else {
            // If existing user doesn't have stats, generate them and save
            const stats = generateRandomStats();
            const updatedUser = { ...user, stats };
            setCurrentUser(updatedUser);
            setUserStats(stats);

            // Update in localStorage
            window.localStorage?.setItem(
              "littleLemonUser",
              JSON.stringify(updatedUser)
            );

            // Update in users array as well
            const updatedUsers = existingUsers.map((u) =>
              u.id === user.id ? updatedUser : u
            );
            window.localStorage?.setItem(
              "littleLemonUsers",
              JSON.stringify(updatedUsers)
            );
          }

          setProfileForm({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
            gender: user.gender || "",
          });

          // Save current user (with stats if updated)
          if (!user.stats) {
            // Already saved above with stats
          } else {
            window.localStorage?.setItem(
              "littleLemonUser",
              JSON.stringify(user)
            );
          }

          setSnackbar({
            open: true,
            message: `Welcome back, ${user.firstName}!`,
            severity: "success",
          });

          // Reset form
          setLoginForm({ email: "", password: "" });
        } else {
          setSnackbar({
            open: true,
            message: "Invalid email or password. Please try again.",
            severity: "error",
          });
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Login failed. Please try again.",
          severity: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [loginForm, validateLoginForm]
  );

  // Handle signup
  const handleSignup = useCallback(
    async (e) => {
      e.preventDefault();

      const formErrors = validateSignupForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      setIsSubmitting(true);
      setErrors({});

      try {
        // Check if user already exists
        const existingUsers = JSON.parse(
          window.localStorage?.getItem("littleLemonUsers") || "[]"
        );
        const userExists = existingUsers.find(
          (u) => u.email.toLowerCase() === signupForm.email.toLowerCase()
        );

        if (userExists) {
          setErrors({ email: "An account with this email already exists" });
          setSnackbar({
            open: true,
            message:
              "An account with this email already exists. Please login instead.",
            severity: "error",
          });
          return;
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Generate random stats for new user
        const randomStats = generateRandomStats();

        // Create new user
        const newUser = {
          id: Date.now().toString(),
          firstName: signupForm.firstName,
          lastName: signupForm.lastName,
          email: signupForm.email,
          phone: signupForm.phone,
          password: signupForm.password,
          address: "",
          gender: "",
          createdAt: new Date().toISOString(),
          stats: randomStats,
        };

        // Save to users array
        const updatedUsers = [...existingUsers, newUser];
        window.localStorage?.setItem(
          "littleLemonUsers",
          JSON.stringify(updatedUsers)
        );

        // Set as current user
        setCurrentUser(newUser);
        setIsLoggedIn(true);

        // Scroll to top after successful signup
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });

        setUserStats(randomStats); // Set the random stats
        setProfileForm({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
          address: newUser.address,
          gender: newUser.gender || "",
        });

        // Save current user
        window.localStorage?.setItem(
          "littleLemonUser",
          JSON.stringify(newUser)
        );

        setSnackbar({
          open: true,
          message: `Welcome to Little Lemon, ${newUser.firstName}!`,
          severity: "success",
        });

        // Reset form
        setSignupForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Signup failed. Please try again.",
          severity: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [signupForm, validateSignupForm]
  );

  // Handle profile update
  const handleProfileUpdate = useCallback(
    async (e) => {
      e.preventDefault();

      const formErrors = validateProfileForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      setIsSubmitting(true);
      setErrors({});

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Update user data
        const updatedUser = { ...currentUser, ...profileForm };

        // Update in users array
        const existingUsers = JSON.parse(
          window.localStorage?.getItem("littleLemonUsers") || "[]"
        );
        const updatedUsers = existingUsers.map((u) =>
          u.id === currentUser.id ? updatedUser : u
        );
        window.localStorage?.setItem(
          "littleLemonUsers",
          JSON.stringify(updatedUsers)
        );

        // Update current user
        setCurrentUser(updatedUser);
        window.localStorage?.setItem(
          "littleLemonUser",
          JSON.stringify(updatedUser)
        );

        setSnackbar({
          open: true,
          message: "Profile updated successfully!",
          severity: "success",
        });

        setIsEditing(false);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Profile update failed. Please try again.",
          severity: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [currentUser, profileForm, validateProfileForm]
  );

  // Handle password change
  const handlePasswordChange = useCallback(
    async (e) => {
      e.preventDefault();

      const newErrors = {};

      // Validate current password
      if (passwordForm.currentPassword !== currentUser.password) {
        newErrors.currentPassword = "Current password is incorrect";
      }

      // Validate new password
      if (!validatePassword(passwordForm.newPassword)) {
        newErrors.newPassword = "Password must be at least 6 characters";
      }

      // Validate password confirmation
      if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
        newErrors.confirmNewPassword = "Passwords do not match";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setIsSubmitting(true);
      setErrors({});

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Update user password
        const updatedUser = {
          ...currentUser,
          password: passwordForm.newPassword,
        };

        // Update in users array
        const existingUsers = JSON.parse(
          window.localStorage?.getItem("littleLemonUsers") || "[]"
        );
        const updatedUsers = existingUsers.map((u) =>
          u.id === currentUser.id ? updatedUser : u
        );
        window.localStorage?.setItem(
          "littleLemonUsers",
          JSON.stringify(updatedUsers)
        );

        // Update current user
        setCurrentUser(updatedUser);
        window.localStorage?.setItem(
          "littleLemonUser",
          JSON.stringify(updatedUser)
        );

        setSnackbar({
          open: true,
          message: "Password changed successfully!",
          severity: "success",
        });

        // Reset password form and hide it
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setShowChangePassword(false);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Password change failed. Please try again.",
          severity: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [currentUser, passwordForm, validatePassword]
  );

  // Handle logout
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserStats({
      totalOrders: 24,
      favoriteItems: 8,
      totalSpent: 456.78,
      memberSince: "2023",
      loyaltyPoints: 1250,
    });
    setProfileForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
    });
    window.localStorage?.removeItem("littleLemonUser");

    setSnackbar({
      open: true,
      message: "You have been logged out successfully.",
      severity: "success",
    });
  }, []);

  // Handle account deletion
  const handleDeleteAccount = useCallback(() => {
    // Remove from users array
    const existingUsers = JSON.parse(
      window.localStorage?.getItem("littleLemonUsers") || "[]"
    );
    const updatedUsers = existingUsers.filter((u) => u.id !== currentUser.id);
    window.localStorage?.setItem(
      "littleLemonUsers",
      JSON.stringify(updatedUsers)
    );

    // Logout
    handleLogout();
    setShowDeleteDialog(false);

    setSnackbar({
      open: true,
      message: "Your account has been deleted successfully.",
      severity: "success",
    });
  }, [currentUser, handleLogout]);

  // Save settings
  const handleSaveSettings = useCallback(() => {
    window.localStorage?.setItem(
      "littleLemonSettings",
      JSON.stringify(settings)
    );
    setSnackbar({
      open: true,
      message: "Settings saved successfully!",
      severity: "success",
    });
  }, [settings]);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  // If not logged in, show auth forms
  if (!isLoggedIn) {
    return (
      <div className="profile-page full-width-page">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-background"></div>
          <div className="hero-content">
            <h1 className="hero-title">
              {authMode === "login" ? "Welcome Back" : "Join Little Lemon"}
            </h1>
            <p className="hero-subtitle">
              {authMode === "login"
                ? "Sign in to your account to continue your culinary journey"
                : "Create your account and discover amazing Mediterranean flavors"}
            </p>
          </div>
        </div>

        {/* Auth Forms */}
        <Box
          sx={{
            py: { xs: 3, sm: 4, md: 6 },
            px: { xs: 1, sm: 2 },
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          }}
        >
          <Container maxWidth="sm">
            <Fade in timeout={1000}>
              <AuthCard>
                <CardContent
                  sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                  }}
                >
                  <Box textAlign="center" mb={4}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: "#495e57",
                        mb: 1,
                        fontSize: {
                          xs: "1.5rem",
                          sm: "1.75rem",
                          md: "2.125rem",
                        },
                      }}
                    >
                      {authMode === "login" ? "Sign In" : "Create Account"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      }}
                    >
                      {authMode === "login"
                        ? "Enter your credentials to access your account"
                        : "Fill in your details to get started"}
                    </Typography>
                  </Box>

                  {authMode === "login" ? (
                    // Login Form
                    <Box component="form" onSubmit={handleLogin}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: { xs: 2, sm: 2.5, md: 3 },
                          mb: { xs: 3, sm: 3.5, md: 4 },
                        }}
                      >
                        <StyledTextField
                          fullWidth
                          label="Email Address *"
                          type="email"
                          value={loginForm.email}
                          onChange={handleInputChange("login", "email")}
                          error={!!errors.email}
                          helperText={errors.email}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email
                                  sx={{
                                    color: errors.email ? "#ff5252" : "#f4ce14",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <StyledTextField
                          fullWidth
                          label="Password *"
                          type={showPassword ? "text" : "password"}
                          value={loginForm.password}
                          onChange={handleInputChange("login", "password")}
                          error={!!errors.password}
                          helperText={errors.password}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock
                                  sx={{
                                    color: errors.password
                                      ? "#ff5252"
                                      : "#f4ce14",
                                  }}
                                />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>

                      <ActionButton
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={isSubmitting}
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
                            <Login />
                          )
                        }
                        sx={{ mb: 3 }}
                      >
                        {isSubmitting ? "Signing In..." : "Sign In"}
                      </ActionButton>

                      <Divider sx={{ my: 2 }}>
                        <Chip
                          label="or"
                          sx={{ backgroundColor: "rgba(244, 206, 20, 0.1)" }}
                        />
                      </Divider>

                      <Button
                        fullWidth
                        variant="text"
                        onClick={handleSwitchToSignup}
                        sx={{
                          color: "#495e57",
                          fontWeight: 600,
                          fontSize: {
                            xs: "0.75rem",
                            sm: "0.875rem",
                            md: "1rem",
                          },
                        }}
                        startIcon={<PersonAdd />}
                      >
                        Don't have an account? Sign up
                      </Button>
                    </Box>
                  ) : (
                    // Signup Form
                    <Box component="form" onSubmit={handleSignup}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: { xs: 2, sm: 2.5, md: 3 },
                          mb: { xs: 3, sm: 3.5, md: 4 },
                        }}
                      >
                        <StyledTextField
                          fullWidth
                          label="First Name *"
                          value={signupForm.firstName}
                          onChange={handleInputChange("signup", "firstName")}
                          error={!!errors.firstName}
                          helperText={errors.firstName}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person
                                  sx={{
                                    color: errors.firstName
                                      ? "#ff5252"
                                      : "#f4ce14",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <StyledTextField
                          fullWidth
                          label="Last Name *"
                          value={signupForm.lastName}
                          onChange={handleInputChange("signup", "lastName")}
                          error={!!errors.lastName}
                          helperText={errors.lastName}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person
                                  sx={{
                                    color: errors.lastName
                                      ? "#ff5252"
                                      : "#f4ce14",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <StyledTextField
                          fullWidth
                          label="Email Address *"
                          type="email"
                          value={signupForm.email}
                          onChange={handleInputChange("signup", "email")}
                          error={!!errors.email}
                          helperText={errors.email}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email
                                  sx={{
                                    color: errors.email ? "#ff5252" : "#f4ce14",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <StyledTextField
                          fullWidth
                          label="Phone Number"
                          value={signupForm.phone}
                          onChange={handleInputChange("signup", "phone")}
                          error={!!errors.phone}
                          helperText={errors.phone}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone
                                  sx={{
                                    color: errors.phone ? "#ff5252" : "#f4ce14",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <StyledTextField
                          fullWidth
                          label="Password *"
                          type={showPassword ? "text" : "password"}
                          value={signupForm.password}
                          onChange={handleInputChange("signup", "password")}
                          error={!!errors.password}
                          helperText={
                            errors.password ||
                            "Password must be at least 6 characters"
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock
                                  sx={{
                                    color: errors.password
                                      ? "#ff5252"
                                      : "#f4ce14",
                                  }}
                                />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />

                        <StyledTextField
                          fullWidth
                          label="Confirm Password *"
                          type={showPassword ? "text" : "password"}
                          value={signupForm.confirmPassword}
                          onChange={handleInputChange(
                            "signup",
                            "confirmPassword"
                          )}
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock
                                  sx={{
                                    color: errors.confirmPassword
                                      ? "#ff5252"
                                      : "#f4ce14",
                                  }}
                                />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>

                      <ActionButton
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={isSubmitting}
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
                            <PersonAdd />
                          )
                        }
                        sx={{ mb: 3 }}
                      >
                        {isSubmitting
                          ? "Creating Account..."
                          : "Create Account"}
                      </ActionButton>

                      <Divider sx={{ my: 2 }}>
                        <Chip
                          label="or"
                          sx={{ backgroundColor: "rgba(244, 206, 20, 0.1)" }}
                        />
                      </Divider>

                      <Button
                        fullWidth
                        variant="text"
                        onClick={handleSwitchToLogin}
                        sx={{
                          color: "#495e57",
                          fontWeight: 600,
                          fontSize: {
                            xs: "0.75rem",
                            sm: "0.875rem",
                            md: "1rem",
                          },
                        }}
                        startIcon={<Login />}
                      >
                        Already have an account? Sign in
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </AuthCard>
            </Fade>
          </Container>
        </Box>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        <style jsx>{`
          .profile-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          }

          .hero-section {
            background: linear-gradient(135deg, #495e57 0%, #3a4c47 100%);
            position: relative;
            overflow: hidden;
            min-height: 40vh;
            display: flex;
            align-items: center;
            color: white;
            width: 100%;
            margin: 0;
            padding: 0;
          }

          @media (max-width: 480px) {
            .hero-section {
              min-height: 35vh;
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
            width: 100%;
          }

          @media (max-width: 400px) {
            .hero-background {
              width: 100vw;
              left: 0;
              right: 0;
            }
          }

          .hero-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            text-align: center;
            position: relative;
            z-index: 2;
            color: white;
            animation: fadeInUp 1s ease-out;
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

          .hero-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            animation: fadeInUp 1s ease-out;
          }

          @media (max-width: 768px) {
            .hero-title {
              font-size: 2.5rem;
            }
          }

          @media (max-width: 480px) {
            .hero-title {
              font-size: 2rem;
            }
          }

          @media (max-width: 400px) {
            .hero-title {
              font-size: 1.8rem;
              margin-bottom: 0.5rem;
            }
          }

          .hero-subtitle {
            font-size: 1.3rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
            animation: fadeInUp 1s ease-out 0.3s both;
          }

          @media (max-width: 768px) {
            .hero-subtitle {
              font-size: 1.2rem;
            }
          }

          @media (max-width: 480px) {
            .hero-subtitle {
              font-size: 1.1rem;
            }
          }

          @media (max-width: 400px) {
            .hero-subtitle {
              font-size: 1rem;
            }
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
        `}</style>
      </div>
    );
  }

  // Logged in user profile view
  return (
    <div className="profile-page full-width-page">
      {/* Profile Hero */}
      <div className="profile-hero">
        <div className="profile-hero-background"></div>
        <div className="profile-hero-content">
          <Avatar
            sx={{
              width: 120,
              height: 120,
              fontSize: "3rem",
              backgroundColor: "#f4ce14",
              color: "#495e57",
              border: "4px solid white",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              animation: `${fadeInUp} 1s ease-out, ${floatAnimation} 3s ease-in-out 1s infinite`,
            }}
          >
            {currentUser?.firstName?.charAt(0)}
            {currentUser?.lastName?.charAt(0)}
          </Avatar>
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: 700,
              mt: 2,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              animation: `${fadeInUp} 1s ease-out 0.3s both`,
            }}
          >
            {currentUser?.firstName} {currentUser?.lastName}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.9)",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              animation: `${fadeInUp} 1s ease-out 0.6s both`,
            }}
          >
            Little Lemon Member since {userStats.memberSince}
          </Typography>
        </div>
      </div>

      {/* Profile Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* User Stats */}
          <Grid item xs={12}>
            <Fade in timeout={800}>
              <ProfileCard>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "#495e57",
                      mb: 3,
                      textAlign: "center",
                    }}
                  >
                    Your Little Lemon Journey
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <StatCard>
                        <Restaurant
                          sx={{ fontSize: "2.5rem", color: "#f4ce14", mb: 1 }}
                        />
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: 700, color: "#495e57" }}
                        >
                          {userStats.totalOrders}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#666", fontWeight: 500 }}
                        >
                          Total Orders
                        </Typography>
                      </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <StatCard>
                        <Favorite
                          sx={{ fontSize: "2.5rem", color: "#e91e63", mb: 1 }}
                        />
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: 700, color: "#495e57" }}
                        >
                          {userStats.favoriteItems}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#666", fontWeight: 500 }}
                        >
                          Favorite Items
                        </Typography>
                      </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <StatCard>
                        <LocalDining
                          sx={{ fontSize: "2.5rem", color: "#4caf50", mb: 1 }}
                        />
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: 700, color: "#495e57" }}
                        >
                          ${userStats.totalSpent}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#666", fontWeight: 500 }}
                        >
                          Total Spent
                        </Typography>
                      </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <StatCard>
                        <Badge
                          sx={{ fontSize: "2.5rem", color: "#ff9800", mb: 1 }}
                        />
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: 700, color: "#495e57" }}
                        >
                          {userStats.loyaltyPoints}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#666", fontWeight: 500 }}
                        >
                          Loyalty Points
                        </Typography>
                      </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <StatCard>
                        <Timeline
                          sx={{ fontSize: "2.5rem", color: "#9c27b0", mb: 1 }}
                        />
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: 700, color: "#495e57" }}
                        >
                          {userStats.memberSince}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#666", fontWeight: 500 }}
                        >
                          Member Since
                        </Typography>
                      </StatCard>
                    </Grid>
                  </Grid>
                </CardContent>
              </ProfileCard>
            </Fade>
          </Grid>

          {/* Profile Information */}
          <Grid item xs={12} md={8} data-section="profile-info">
            <Slide direction="left" in timeout={1000}>
              <ProfileCard>
                <CardContent sx={{ p: 4 }}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb={4}
                    position="relative"
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "#495e57",
                        textAlign: "center",
                      }}
                    >
                      Profile Information
                    </Typography>
                    <IconButton
                      onClick={() => setIsEditing(!isEditing)}
                      sx={{
                        color: "#f4ce14",
                        position: "absolute",
                        right: 0,
                        "&:hover": {
                          backgroundColor: "rgba(244, 206, 20, 0.1)",
                        },
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Box>

                  <Box
                    component="form"
                    onSubmit={handleProfileUpdate}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      maxWidth: "600px",
                      margin: "0 auto",
                    }}
                  >
                    <Grid container spacing={4} sx={{ width: "100%" }}>
                      <Grid item xs={12} sm={6}>
                        <StyledTextField
                          fullWidth
                          label="First Name"
                          value={profileForm.firstName}
                          onChange={handleInputChange("profile", "firstName")}
                          error={!!errors.firstName}
                          helperText={errors.firstName}
                          disabled={!isEditing}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person
                                  sx={{
                                    color: errors.firstName
                                      ? "#ff5252"
                                      : "#f4ce14",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <StyledTextField
                          fullWidth
                          label="Last Name"
                          value={profileForm.lastName}
                          onChange={handleInputChange("profile", "lastName")}
                          error={!!errors.lastName}
                          helperText={errors.lastName}
                          disabled={!isEditing}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person
                                  sx={{
                                    color: errors.lastName
                                      ? "#ff5252"
                                      : "#f4ce14",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <StyledTextField
                          fullWidth
                          label="Email Address"
                          type="email"
                          value={profileForm.email}
                          onChange={handleInputChange("profile", "email")}
                          error={!!errors.email}
                          helperText={errors.email}
                          disabled={!isEditing}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email
                                  sx={{
                                    color: errors.email ? "#ff5252" : "#f4ce14",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <StyledFormControl
                          fullWidth
                          error={!!errors.gender}
                          disabled={!isEditing}
                        >
                          <InputLabel>Gender</InputLabel>
                          <Select
                            value={profileForm.gender}
                            onChange={handleInputChange("profile", "gender")}
                            label="Gender"
                            startAdornment={
                              <InputAdornment position="start">
                                <Wc
                                  sx={{
                                    color: errors.gender
                                      ? "#ff5252"
                                      : "#f4ce14",
                                    mr: 1,
                                  }}
                                />
                              </InputAdornment>
                            }
                          >
                            <MenuItem value="">
                              <em>Prefer not to say</em>
                            </MenuItem>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                          </Select>
                        </StyledFormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <StyledTextField
                          fullWidth
                          label="Phone Number"
                          value={profileForm.phone}
                          onChange={handleInputChange("profile", "phone")}
                          error={!!errors.phone}
                          helperText={errors.phone}
                          disabled={!isEditing}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone
                                  sx={{
                                    color: errors.phone ? "#ff5252" : "#f4ce14",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <StyledTextField
                          fullWidth
                          label="Address"
                          value={profileForm.address}
                          onChange={handleInputChange("profile", "address")}
                          disabled={!isEditing}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationOn
                                  sx={{
                                    color: "#f4ce14",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      {/* Change Password Section */}
                      <Grid item xs={12}>
                        <Box sx={{ mt: 2 }}>
                          {showChangePassword && (
                            <Box
                              component="form"
                              onSubmit={handlePasswordChange}
                              sx={{
                                mt: 3,
                                p: 3,
                                border: "1px solid #e0e0e0",
                                borderRadius: 2,
                              }}
                            >
                              <Grid container spacing={3}>
                                <Grid item xs={12}>
                                  <StyledTextField
                                    fullWidth
                                    label="Current Password *"
                                    type="password"
                                    value={passwordForm.currentPassword}
                                    onChange={handleInputChange(
                                      "password",
                                      "currentPassword"
                                    )}
                                    error={!!errors.currentPassword}
                                    helperText={errors.currentPassword}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <Lock
                                            sx={{
                                              color: errors.currentPassword
                                                ? "#ff5252"
                                                : "#f4ce14",
                                            }}
                                          />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <StyledTextField
                                    fullWidth
                                    label="New Password *"
                                    type="password"
                                    value={passwordForm.newPassword}
                                    onChange={handleInputChange(
                                      "password",
                                      "newPassword"
                                    )}
                                    error={!!errors.newPassword}
                                    helperText={
                                      errors.newPassword ||
                                      "Password must be at least 6 characters"
                                    }
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <Lock
                                            sx={{
                                              color: errors.newPassword
                                                ? "#ff5252"
                                                : "#f4ce14",
                                            }}
                                          />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <StyledTextField
                                    fullWidth
                                    label="Confirm New Password *"
                                    type="password"
                                    value={passwordForm.confirmNewPassword}
                                    onChange={handleInputChange(
                                      "password",
                                      "confirmNewPassword"
                                    )}
                                    error={!!errors.confirmNewPassword}
                                    helperText={errors.confirmNewPassword}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <Lock
                                            sx={{
                                              color: errors.confirmNewPassword
                                                ? "#ff5252"
                                                : "#f4ce14",
                                            }}
                                          />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <Box
                                    display="flex"
                                    gap={2}
                                    justifyContent="flex-end"
                                  >
                                    <Button
                                      variant="outlined"
                                      onClick={() => {
                                        setShowChangePassword(false);
                                        setPasswordForm({
                                          currentPassword: "",
                                          newPassword: "",
                                          confirmNewPassword: "",
                                        });
                                        setErrors({});
                                      }}
                                      sx={{
                                        borderColor: "#666",
                                        color: "#666",
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                    <ActionButton
                                      type="submit"
                                      variant="primary"
                                      disabled={isSubmitting}
                                      startIcon={<Save />}
                                    >
                                      {isSubmitting
                                        ? "Changing..."
                                        : "Change Password"}
                                    </ActionButton>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>

                    {isEditing && (
                      <Box
                        display="flex"
                        gap={2}
                        mt={4}
                        justifyContent="flex-end"
                      >
                        <Button
                          variant="outlined"
                          startIcon={<Cancel />}
                          onClick={() => {
                            setIsEditing(false);
                            setErrors({});
                            // Reset form to current user data
                            setProfileForm({
                              firstName: currentUser.firstName || "",
                              lastName: currentUser.lastName || "",
                              email: currentUser.email || "",
                              phone: currentUser.phone || "",
                              address: currentUser.address || "",
                              gender: currentUser.gender || "",
                            });
                          }}
                          sx={{ borderColor: "#666", color: "#666" }}
                        >
                          Cancel
                        </Button>
                        <ActionButton
                          type="submit"
                          variant="primary"
                          disabled={isSubmitting}
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
                              <Save />
                            )
                          }
                        >
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </ActionButton>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </ProfileCard>
            </Slide>
          </Grid>

          {/* Settings & Actions */}
          <Grid item xs={12} md={4}>
            <Slide direction="right" in timeout={1200}>
              <Box display="flex" flexDirection="column" gap={3}>
                {/* Notification Settings */}
                <ProfileCard>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <Notifications sx={{ color: "#f4ce14", mr: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "#495e57" }}
                      >
                        Notifications
                      </Typography>
                    </Box>

                    <Box display="flex" flexDirection="column" gap={2}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.emailNotifications}
                            onChange={handleInputChange(
                              "settings",
                              "emailNotifications"
                            )}
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "#f4ce14",
                              },
                              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                { backgroundColor: "#f4ce14" },
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Email Notifications
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.smsNotifications}
                            onChange={handleInputChange(
                              "settings",
                              "smsNotifications"
                            )}
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "#f4ce14",
                              },
                              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                { backgroundColor: "#f4ce14" },
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            SMS Notifications
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.marketingEmails}
                            onChange={handleInputChange(
                              "settings",
                              "marketingEmails"
                            )}
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "#f4ce14",
                              },
                              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                { backgroundColor: "#f4ce14" },
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Marketing Emails
                          </Typography>
                        }
                      />
                    </Box>

                    <ActionButton
                      variant="primary"
                      fullWidth
                      startIcon={<Save />}
                      onClick={handleSaveSettings}
                      sx={{ mt: 3 }}
                    >
                      Save Settings
                    </ActionButton>
                  </CardContent>
                </ProfileCard>

                {/* Account Actions */}
                <ProfileCard>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <Security sx={{ color: "#f4ce14", mr: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "#495e57" }}
                      >
                        Account Actions
                      </Typography>
                    </Box>

                    <Box display="flex" flexDirection="column" gap={2}>
                      <ActionButton
                        variant="secondary"
                        fullWidth
                        startIcon={<ExitToApp />}
                        onClick={handleLogout}
                      >
                        Sign Out
                      </ActionButton>
                      <ActionButton
                        variant="outlined"
                        fullWidth
                        startIcon={<Lock />}
                        onClick={() => {
                          setShowChangePassword(!showChangePassword);
                          if (showChangePassword) {
                            // Clear errors and form when closing
                            setErrors({});
                            setPasswordForm({
                              currentPassword: "",
                              newPassword: "",
                              confirmNewPassword: "",
                            });
                          } else {
                            // Scroll to Profile Information section when opening the form
                            const profileSection = document.querySelector(
                              '[data-section="profile-info"]'
                            );
                            if (profileSection) {
                              profileSection.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                            } else {
                              // Fallback: scroll to a reasonable position
                              window.scrollTo({
                                top: 300,
                                left: 0,
                                behavior: "smooth",
                              });
                            }
                          }
                        }}
                        sx={{
                          borderColor: "#f4ce14",
                          color: "white",
                          fontWeight: 600,
                          "& .MuiSvgIcon-root": {
                            color: "white",
                          },
                          "&:hover": {
                            borderColor: "#f4ce14",
                            backgroundColor: "rgba(244, 206, 20, 0.1)",
                            color: "white",
                            "& .MuiSvgIcon-root": {
                              color: "white",
                            },
                          },
                        }}
                      >
                        {showChangePassword
                          ? "Cancel Password Change"
                          : "Change Password"}
                      </ActionButton>
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        startIcon={<Person />}
                        onClick={() => setShowDeleteDialog(true)}
                        sx={{
                          borderColor: "#f44336",
                          color: "#f44336",
                          "&:hover": {
                            borderColor: "#d32f2f",
                            backgroundColor: "rgba(244, 67, 54, 0.04)",
                          },
                        }}
                      >
                        Delete Account
                      </Button>
                    </Box>
                  </CardContent>
                </ProfileCard>
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Container>

      {/* Delete Account Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#495e57" }}>
            Delete Account
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2, color: "#666" }}>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#f44336", fontWeight: 500 }}
          >
            All your data, including order history and preferences, will be
            permanently deleted.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={() => setShowDeleteDialog(false)}
            sx={{ color: "#666" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            variant="contained"
            color="error"
            startIcon={<Person />}
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <style jsx>{`
        .profile-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .profile-hero {
          position: relative;
          height: 50vh;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .profile-hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            #495e57 0%,
            #3a4c47 50%,
            #495e57 100%
          );
        }

        .profile-hero-background::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(73, 94, 87, 0.3) 0%,
            rgba(244, 206, 20, 0.2) 100%
          );
        }

        .profile-hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: white;
          animation: ${fadeInUp} 1s ease-out;
        }

        @media (max-width: 645px) {
          .profile-hero-content {
            padding: 0 15px;
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
      `}</style>
    </div>
  );
}

export default ProfilePage;
