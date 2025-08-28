import React, { useState, useEffect, useRef } from "react";
import mario from "../../assets/mariorossi.jpeg";
import elena from "../../assets/elena.avif";
import antonio from "../../assets/antonio.avif";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  Fade,
  Zoom,
  Slide,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import {
  Restaurant,
  Star,
  Schedule,
  LocationOn,
  LocalDining,
  Nature,
  Groups,
  EmojiEvents,
  Favorite,
  TrendingUp,
  Phone,
  AccessTime,
  TableRestaurant,
  Celebration,
} from "@mui/icons-material";

// Optimized animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

// Styled Components
const ContentSection = styled(Box)(({ theme }) => ({
  padding: "4rem 0",
  position: "relative",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(244, 206, 20, 0.1), transparent)",
    transition: "left 0.6s",
  },
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    "&::before": {
      left: "100%",
    },
  },
  "& .MuiCardContent-root": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #f4ce14, #ffea61)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 1.5rem",
  boxShadow: "0 8px 24px rgba(244, 206, 20, 0.3)",
  animation: `${floatAnimation} 6s ease-in-out infinite`,
  "& svg": {
    fontSize: "2.5rem",
    color: "#495e57",
  },
}));

const StatCard = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: "2rem 1.5rem",
  background: "rgba(73, 94, 87, 0.95)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  color: "white",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "160px",
  width: "200px", // Fixed width
  margin: "0 auto",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #f4ce14, #ffea61, #f4ce14)",
  },
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 700,
  color: "#f4ce14",
  lineHeight: 1,
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "1.8rem",
  },
}));

const TeamMemberCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  border: "1px solid rgba(244, 206, 20, 0.2)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  transition: "all 0.4s ease",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.15)",
  },
  "& .MuiCardContent-root": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
}));

const ProgressBarContainer = styled(Box)(({ theme }) => ({
  margin: "1rem 0",
  "& .MuiLinearProgress-root": {
    height: "8px",
    borderRadius: "4px",
    backgroundColor: "rgba(244, 206, 20, 0.2)",
  },
  "& .MuiLinearProgress-bar": {
    background: "linear-gradient(90deg, #f4ce14, #ffea61)",
    borderRadius: "4px",
  },
}));

const PulsingCard = styled(Box)(({ theme }) => ({
  background: "rgba(244, 206, 20, 0.1)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  border: "2px solid rgba(244, 206, 20, 0.3)",
  padding: "1.5rem",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  animation: `${floatAnimation} 4s ease-in-out infinite`,
  minHeight: "160px",
  width: "180px", // Fixed width to match stat cards proportionally
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-2px",
    left: "-2px",
    right: "-2px",
    bottom: "-2px",
    background: "linear-gradient(45deg, #f4ce14, #ffea61, #f4ce14, #ffea61)",
    borderRadius: "22px",
    zIndex: -1,
    backgroundSize: "400% 400%",
    animation: `${shimmer} 3s ease-in-out infinite`,
  },
  "&:hover": {
    transform: "scale(1.05)",
    "& .icon": {
      transform: "rotate(360deg) scale(1.2)",
    },
  },
}));

const AnimatedIcon = styled(Box)(({ theme }) => ({
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #495e57, #3a4c47)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 1rem",
  transition: "all 0.4s ease",
  "& svg": {
    fontSize: "2rem",
    color: "#f4ce14",
  },
}));

// Data
const values = [
  {
    icon: <Nature />,
    title: "Fresh Ingredients",
    description:
      "We source the finest Mediterranean ingredients, ensuring every dish bursts with authentic flavors and nutritional value.",
  },
  {
    icon: <Groups />,
    title: "Family Tradition",
    description:
      "Three generations of culinary expertise passed down through our family, bringing you time-tested recipes and techniques.",
  },
  {
    icon: <EmojiEvents />,
    title: "Quality Excellence",
    description:
      "Our commitment to excellence has earned us recognition as one of Chicago's premier Mediterranean dining destinations.",
  },
  {
    icon: <Favorite />,
    title: "Community Love",
    description:
      "We're not just a restaurant - we're a gathering place where true friendships are made and lasting memories are created.",
  },
];

const stats = [
  { number: "15+", label: "Years of Excellence" },
  { number: "50K+", label: "Happy Customers" },
  { number: "200+", label: "Signature Dishes" },
  { number: "4.9", label: "Average Rating" },
];

const teamMembers = [
  {
    name: "Mario Rossi",
    role: "Head Chef & Co-Founder",
    experience:
      "With 20+ years in Mediterranean cuisine, Mario brings authentic flavors from his grandmother's kitchen to yours.",
    avatar: mario,
    skills: [
      { name: "Mediterranean Cuisine", level: 95 },
      { name: "Menu Innovation", level: 88 },
      { name: "Team Leadership", level: 92 },
    ],
  },
  {
    name: "Elena Dimitriou",
    role: "Executive Sous Chef",
    experience:
      "Elena specializes in traditional Greek and Italian cooking techniques, ensuring every dish meets our exacting standards.",
    avatar: elena,
    skills: [
      { name: "Traditional Techniques", level: 93 },
      { name: "Quality Control", level: 96 },
      { name: "Recipe Development", level: 89 },
    ],
  },
  {
    name: "Antonio Torres",
    role: "Head Pastry Chef",
    experience:
      "Antonio's exquisite Mediterranean desserts are the perfect finale to any meal, blending classic recipes with modern presentation.",
    avatar: antonio,
    skills: [
      { name: "Pastry Arts", level: 94 },
      { name: "Dessert Innovation", level: 91 },
      { name: "Artistic Presentation", level: 97 },
    ],
  },
];

// CTA Features data
const ctaFeatures = [
  {
    icon: <Restaurant />,
    title: "Fresh Cuisine",
    subtitle: "Daily specials",
    delay: "0s",
  },
  {
    icon: <TableRestaurant />,
    title: "Perfect Ambiance",
    subtitle: "Cozy dining",
    delay: "1s",
  },
  {
    icon: <Star />,
    title: "Top Rated",
    subtitle: "5-star service",
    delay: "2s",
  },
  {
    icon: <Celebration />,
    title: "Special Events",
    subtitle: "Private dining",
    delay: "3s",
  },
];

function AboutPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [animateStats, setAnimateStats] = useState(false);
  const [animateTeamSkills, setAnimateTeamSkills] = useState(false);
  const statsRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateStats(true);
          } else {
            setAnimateStats(false);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    const teamObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateTeamSkills(true);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    if (teamRef.current) {
      teamObserver.observe(teamRef.current);
    }

    return () => {
      if (statsRef.current) {
        statsObserver.unobserve(statsRef.current);
      }
      if (teamRef.current) {
        teamObserver.unobserve(teamRef.current);
      }
    };
  }, []);

  const AnimatedStat = ({ stat, index }) => {
    const [displayNumber, setDisplayNumber] = useState("0");

    useEffect(() => {
      if (animateStats) {
        const finalNumber = stat.number;
        const isNumeric = /^\d+/.test(finalNumber);

        if (isNumeric) {
          const number = parseInt(finalNumber);
          const duration = 2000;
          const steps = 60;
          const increment = number / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
              setDisplayNumber(finalNumber);
              clearInterval(timer);
            } else {
              setDisplayNumber(
                Math.floor(current) + finalNumber.replace(/^\d+/, "")
              );
            }
          }, duration / steps);

          return () => clearInterval(timer);
        } else {
          setTimeout(() => setDisplayNumber(finalNumber), index * 200);
        }
      }
    }, [animateStats, stat.number, index]);

    return (
      <Zoom in={animateStats} style={{ transitionDelay: `${index * 200}ms` }}>
        <StatCard>
          <StatNumber variant="h3">{displayNumber}</StatNumber>
          <Typography
            variant="h6"
            sx={{
              mt: 1,
              fontWeight: 500,
              fontSize: {
                xs: "0.9rem", // Mobile: 14.4px
                sm: "1rem", // Small: 16px
                md: "1.1rem", // Medium: 17.6px
                lg: "1.25rem", // Large: 20px (default h6)
              },
            }}
          >
            {stat.label}
          </Typography>
        </StatCard>
      </Zoom>
    );
  };

  return (
    <div className="about-page full-width-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">Taste the Mediterranean Heritage</h1>
          <p className="hero-subtitle">
            Discover the authentic flavors and rich traditions that have been
            lovingly preserved through generations of culinary artistry.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <ContentSection>
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
              Our Values
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
              The principles that guide everything we do at Little Lemon
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ justifyContent: "center" }}>
            {values.map((value, index) => (
              <Grid item xs={12} md={6} lg={3} key={value.title}>
                <Fade
                  in
                  timeout={1000}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <StyledCard>
                    <CardContent sx={{ p: 3, textAlign: "center" }}>
                      <IconWrapper
                        style={{ animationDelay: `${index * 0.5}s` }}
                      >
                        {value.icon}
                      </IconWrapper>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          color: "#495e57",
                          fontSize: {
                            xs: "1.25rem", // Mobile: 20px
                            sm: "1.35rem", // Small: 21.6px
                            md: "1.45rem", // Medium: 23.2px
                            lg: "1.5rem", // Large: 24px (default h5)
                          },
                        }}
                      >
                        {value.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#666", lineHeight: 1.6 }}
                      >
                        {value.description}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ContentSection>

      {/* Statistics Section */}
      <ContentSection
        sx={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}
        ref={statsRef}
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
              }}
            >
              Our Journey in Numbers
            </Typography>
          </Box>

          <Grid
            container
            spacing={3}
            sx={{
              maxWidth: "900px",
              mx: "auto",
              justifyContent: "center",
              alignItems: "stretch", // Ensure equal height
            }}
          >
            {stats.map((stat, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={stat.label}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <AnimatedStat stat={stat} index={index} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </ContentSection>

      {/* Team Section */}
      <ContentSection ref={teamRef}>
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
              }}
            >
              Meet Our Team
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
              The passionate people behind Little Lemon's success
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ justifyContent: "center" }}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={member.name}>
                <Slide
                  direction="up"
                  in
                  timeout={1000}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <TeamMemberCard>
                    <CardContent sx={{ p: 3, textAlign: "center" }}>
                      <Avatar
                        src={member.avatar}
                        sx={{
                          width: 120,
                          height: 120,
                          mx: "auto",
                          mb: 2,
                          border: "4px solid #f4ce14",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                        }}
                      />
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
                        {member.name}
                      </Typography>
                      <Chip
                        label={member.role}
                        sx={{
                          backgroundColor: "#f4ce14",
                          color: "#495e57",
                          fontWeight: 600,
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          mb: 3,
                          lineHeight: 1.6,
                          flexGrow: 1,
                        }}
                      >
                        {member.experience}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ textAlign: "left" }}>
                        <Typography
                          variant="h6"
                          sx={{ color: "#495e57", mb: 2, fontWeight: 600 }}
                        >
                          Expertise
                        </Typography>
                        {member.skills.map((skill) => (
                          <Box key={skill.name}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ color: "#666" }}
                              >
                                {skill.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "#f4ce14", fontWeight: 600 }}
                              >
                                {skill.level}%
                              </Typography>
                            </Box>
                            <ProgressBarContainer>
                              <LinearProgress
                                variant="determinate"
                                value={animateTeamSkills ? skill.level : 0}
                                sx={{ transition: "all 1.5s ease-in-out" }}
                              />
                            </ProgressBarContainer>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </TeamMemberCard>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ContentSection>

      {/* Call to Action */}
      <ContentSection
        className="cta-section"
        sx={{
          background: "linear-gradient(135deg, #495e57 0%, #3a4c47 100%)",
          color: "white",
          position: "relative",
          minHeight: "40vh",
          display: "flex",
          alignItems: "center",
          padding: "2rem 0",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 70% 30%, rgba(244, 206, 20, 0.1) 0%, transparent 50%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Box textAlign="center">
            <Typography
              variant="h3"
              className="cta-title"
              sx={{
                fontWeight: 700,
                mb: 3,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Begin Your Culinary Journey
            </Typography>
            <Typography
              variant="h6"
              className="cta-subtitle"
              sx={{
                opacity: 0.9,
                mb: 4,
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Immerse yourself in an extraordinary Mediterranean dining
              experience where every moment creates lasting memories.
            </Typography>

            <Grid
              container
              spacing={3}
              className="cta-grid"
              sx={{
                maxWidth: "800px",
                mx: "auto",
                justifyContent: "center",
                alignItems: "stretch", // Ensure equal height
              }}
            >
              {ctaFeatures.map((feature, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={feature.title}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Zoom
                    in
                    timeout={1000}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <PulsingCard
                      className="cta-card"
                      style={{ animationDelay: feature.delay }}
                    >
                      <AnimatedIcon className="icon">
                        {feature.icon}
                      </AnimatedIcon>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          color: "white",
                          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                          fontSize: "1rem",
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.9)",
                          fontWeight: 500,
                          fontSize: "0.85rem",
                        }}
                      >
                        {feature.subtitle}
                      </Typography>
                    </PulsingCard>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </ContentSection>

      <style jsx>{`
        .about-page {
          overflow: hidden;
          overflow-x: hidden;
          width: 100%;
          max-width: 100vw;
          box-sizing: border-box;
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
        }

        @media (max-width: 480px) {
          .hero-content {
            padding: 2rem 15px;
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
            margin-bottom: 1.5rem;
            margin-top: 1rem;
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
            margin-bottom: 1.5rem;
            line-height: 1.6;
          }
        }

        @media (max-width: 400px) {
          .hero-subtitle {
            font-size: 1rem;
            padding: 0 10px;
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

        /* CTA section typography to match hero section */
        .cta-title {
          font-size: 3rem !important;
          font-weight: 700 !important;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3) !important;
        }

        .cta-subtitle {
          font-size: 1.3rem !important;
          opacity: 0.9 !important;
          line-height: 1.6 !important;
        }

        /* Responsive CTA section */
        @media (max-width: 768px) {
          .cta-title {
            font-size: 2.5rem !important;
          }

          .cta-subtitle {
            font-size: 1.2rem !important;
          }
        }

        @media (max-width: 480px) {
          .cta-title {
            font-size: 2rem !important;
          }

          .cta-subtitle {
            font-size: 1.1rem !important;
          }
        }

        @media (max-width: 400px) {
          .cta-title {
            font-size: 1.8rem !important;
            margin-bottom: 0.5rem !important;
          }

          .cta-subtitle {
            font-size: 1rem !important;
            padding: 0 10px !important;
          }
        }

        /* Mobile styles for Call to Action section */
        @media (max-width: 768px) {
          .cta-section {
            min-height: 35vh !important;
            padding: 3rem 0 1.5rem 0 !important;
          }

          .cta-grid {
            gap: 1rem !important;
          }

          .cta-card {
            padding: 1rem !important;
          }

          .cta-card .icon {
            width: 50px !important;
            height: 50px !important;
          }
        }

        @media (max-width: 480px) {
          .cta-section {
            min-height: 30vh !important;
            padding: 2.5rem 0 1rem 0 !important;
          }

          .cta-card {
            padding: 0.8rem !important;
          }

          .cta-card .icon {
            width: 45px !important;
            height: 45px !important;
          }
        }

        /* Very small devices responsive fixes */
        @media (max-width: 400px) {
          .cta-section {
            min-height: 25vh !important;
            padding: 2rem 0 0.5rem 0 !important;
            width: 100vw !important;
            margin-left: calc(-50vw + 50%) !important;
            position: relative !important;
            left: 0 !important;
            right: 0 !important;
          }

          .cta-card {
            padding: 0.6rem !important;
            margin: 0 auto !important;
            max-width: calc(100vw - 40px) !important;
          }

          .cta-card .icon {
            width: 40px !important;
            height: 40px !important;
          }

          .cta-grid {
            gap: 0.5rem !important;
            padding: 0 10px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default AboutPage;
