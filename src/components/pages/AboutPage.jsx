import React, { useState, useEffect, useRef } from "react";
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

// Pattern animation for hero background
const patternMove = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(120deg); }
  66% { transform: translate(-20px, 20px) rotate(240deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
`;

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #495e57 0%, #3a4c47 100%)",
  position: "relative",
  overflow: "hidden",
  minHeight: "60vh",
  display: "flex",
  alignItems: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 25% 25%, rgba(244, 206, 20, 0.1) 0%, transparent 25%),
      radial-gradient(circle at 75% 75%, rgba(244, 206, 20, 0.08) 0%, transparent 25%),
      radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.05) 0%, transparent 25%),
      radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.03) 0%, transparent 25%)
    `,
    animation: `${patternMove} 20s ease-in-out infinite`,
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(90deg, transparent, #f4ce14, transparent)",
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  color: "white",
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3.5rem",
  fontWeight: 700,
  marginBottom: "1rem",
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  animation: `${fadeInUp} 1s ease-out`,
  [theme.breakpoints.down("md")]: {
    fontSize: "2.5rem",
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem",
  opacity: 0.9,
  maxWidth: "600px",
  margin: "0 auto",
  lineHeight: 1.6,
  animation: `${fadeInUp} 1s ease-out 0.3s both`,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.1rem",
  },
}));

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

const FloatingElement = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.05)",
  animation: `${floatAnimation} 8s ease-in-out infinite`,
  pointerEvents: "none",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "60%",
    height: "60%",
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.1)",
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
    avatar:
      "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=150&h=150&fit=crop&crop=face",
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
    avatar:
      "https://images.unsplash.com/photo-1727975738173-cf816f48b71e?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    skills: [
      { name: "Traditional Techniques", level: 93 },
      { name: "Quality Control", level: 96 },
      { name: "Recipe Development", level: 89 },
    ],
  },
  {
    name: "Chef Antonio Torres",
    role: "Head Pastry Chef",
    experience:
      "Antonio's exquisite Mediterranean desserts are the perfect finale to any meal, blending classic recipes with modern presentation.",
    avatar:
      "https://images.unsplash.com/photo-1689588532679-4bb5fdd8f6d5?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          <Typography variant="h6" sx={{ mt: 1, fontWeight: 500 }}>
            {stat.label}
          </Typography>
        </StatCard>
      </Zoom>
    );
  };

  return (
    <Box component="main" sx={{ overflow: "hidden" }}>
      {/* Hero Section */}
      <HeroSection>
        <FloatingElement
          sx={{
            top: "10%",
            right: "10%",
            animationDelay: "0s",
          }}
        />
        <FloatingElement
          sx={{
            bottom: "20%",
            left: "15%",
            animationDelay: "4s",
          }}
        />

        <Container maxWidth="lg">
          <HeroContent>
            <HeroTitle variant="h1">Taste the Mediterranean Heritage</HeroTitle>
            <HeroSubtitle variant="h5">
              Discover the authentic flavors and rich traditions that have been
              lovingly preserved through generations of culinary artistry.
            </HeroSubtitle>
          </HeroContent>
        </Container>
      </HeroSection>

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
                        sx={{ fontWeight: 600, mb: 2, color: "#495e57" }}
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
                        sx={{ fontWeight: 600, mb: 1, color: "#495e57" }}
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
        sx={{
          background: "linear-gradient(135deg, #495e57 0%, #3a4c47 100%)",
          color: "white",
          position: "relative",
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
                    <PulsingCard style={{ animationDelay: feature.delay }}>
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
    </Box>
  );
}

export default AboutPage;
