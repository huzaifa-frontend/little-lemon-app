import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import MarioA from '../../assets/MarioA.jpg';

// Optimized animations with reduced complexity
const parallaxFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const textReveal = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

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

// Sophisticated styled components with optimized performance
const StyledHeading = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  color: '#333',
  marginBottom: '0rem',
  position: 'relative',
  display: 'inline-block',
  paddingBottom: '0.8rem',
  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.05)',
  marginTop: '3rem',
  '&::after': {
    content: '""',
    width: '50%',
    height: '4px',
    backgroundColor: '#f4ce14',
    position: 'absolute',
    left: '25%',
    bottom: 0,
    borderRadius: '2px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.8rem',
    marginTop: '2rem',
  },
}));

const StoryContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1300,
  margin: '0 auto',
  position: 'relative',
  background: 'transparent',
  padding: '0rem 0',
  // FIXED: Lower z-index to allow floating elements above
  zIndex: 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '20%',
    left: '-10%',
    width: '30%',
    height: '60%',
    background: 'radial-gradient(ellipse, rgba(244, 206, 20, 0.03) 0%, transparent 70%)',
    borderRadius: '50%',
    zIndex: -1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '10%',
    right: '-5%',
    width: '25%',
    height: '80%',
    background: 'radial-gradient(ellipse, rgba(68, 68, 85, 0.02) 0%, transparent 70%)',
    borderRadius: '50%',
    zIndex: -1,
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  // FIXED: Lower z-index to allow floating elements above
  zIndex: 'auto',
  backdropFilter: 'blur(20px)',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  borderRadius: '32px',
  padding: '3rem',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    0 1px 2px rgba(0, 0, 0, 0.05)
  `,
  transition: 'all 0.4s ease',
  animation: `${fadeInUp} 0.8s ease-out forwards`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `
      0 16px 48px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      0 2px 8px rgba(244, 206, 20, 0.1)
    `,
  },
  [theme.breakpoints.down('md')]: {
    padding: '2rem',
    borderRadius: '24px',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  minHeight: '500px',
  overflow: 'hidden',
  borderRadius: '24px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(135deg, 
        rgba(244, 206, 20, 0.15) 0%, 
        rgba(0, 0, 0, 0.05) 50%,
        rgba(244, 206, 20, 0.08) 100%
      )
    `,
    zIndex: 2,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    '&::before': {
      opacity: 1,
    },
    '& img': {
      transform: 'scale(1.05)', // Reduced scale for better performance
    },
  },
  [theme.breakpoints.down('md')]: {
    minHeight: '280px', // Better mobile height
    borderRadius: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '250px',
  },
}));

const StoryImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center', // Better centering for mobile
  transition: 'transform 0.4s ease', // Reduced transition duration
  filter: 'contrast(1.05) saturate(1.1)',
  willChange: 'transform', // Optimize for transform changes
}));

const TextContent = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
}));

const ParagraphText = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  lineHeight: 1.75,
  color: '#2d3748',
  marginBottom: '1.25rem', // Reduced spacing between paragraphs
  fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
  fontWeight: 400,
  letterSpacing: '-0.01em',
  position: 'relative',
  animation: `${textReveal} 0.6s ease-out forwards`, // Reduced animation duration
  '&::first-letter': {
    fontSize: '1.5em',
    fontWeight: 600,
    color: '#1a202c',
    lineHeight: 1,
  },
  '&:nth-of-type(2)': {
    animationDelay: '0.1s',
    position: 'relative',
    padding: '1.5rem 2rem',
    background: 'linear-gradient(135deg, rgba(244, 206, 20, 0.04) 0%, rgba(244, 206, 20, 0.08) 100%)',
    borderRadius: '16px',
    borderLeft: '3px solid #f4ce14',
    fontStyle: 'italic',
    fontSize: '1.1rem',
    margin: '1.5rem 0', // Reduced margin for tighter spacing
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-8px',
      left: '24px',
      width: '40px',
      height: '3px',
      background: '#f4ce14',
      borderRadius: '2px',
    },
  },
  '&:nth-of-type(3)': {
    animationDelay: '0.2s',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
    lineHeight: 1.6,
    marginBottom: '1rem', // Reduced mobile spacing
    '&:nth-of-type(2)': {
      padding: '1.25rem 1.5rem',
      margin: '1.25rem 0', // Reduced mobile margin
      fontSize: '1rem',
    },
  },
}));

const FinalQuote = styled(Box)(({ theme }) => ({
  marginTop: '2rem', // Reduced top margin
  padding: '2rem',
  background: 'linear-gradient(135deg, rgba(45, 55, 72, 0.95) 0%, rgba(26, 32, 44, 0.98) 100%)',
  borderRadius: '20px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #f4ce14 0%, #ffd700 50%, #f4ce14 100%)',
  },
  '&::after': {
    content: '"❞"',
    position: 'absolute',
    bottom: '10px',
    right: '20px',
    fontSize: '2.5rem',
    color: '#f4ce14',
    opacity: 0.3,
    fontFamily: 'serif',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '1.5rem',
    padding: '1.5rem',
  },
}));

const QuoteText = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontSize: '1.25rem',
  fontWeight: 500,
  lineHeight: 1.6,
  textAlign: 'center',
  fontFamily: '"Playfair Display", serif',
  letterSpacing: '0.5px',
  position: 'relative',
  '&::before': {
    content: '"❝"',
    position: 'absolute',
    top: '-10px',
    left: '-10px',
    fontSize: '2.5rem',
    color: '#f4ce14',
    opacity: 0.6,
    fontFamily: 'serif',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.1rem',
  },
}));

const FloatingAccent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '120px',
  height: '120px',
  background: 'radial-gradient(circle, rgba(244, 206, 20, 0.1) 0%, transparent 70%)',
  borderRadius: '50%',
  animation: `${parallaxFloat} 8s ease-in-out infinite`, // Slower animation for smoother performance
  zIndex: 1,
  willChange: 'transform', // Optimize for transform changes
  '&:nth-of-type(1)': {
    top: '10%',
    right: '15%',
    animationDelay: '0s',
  },
  '&:nth-of-type(2)': {
    bottom: '20%',
    left: '10%',
    animationDelay: '4s',
    width: '80px',
    height: '80px',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none', // Hide floating accents on mobile for better performance
  },
}));

function Chicago() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="section"
      sx={{
        py: 3,
        position: 'relative',
        overflow: 'hidden',
        // FIXED: Lower z-index to allow floating elements above
        zIndex: 'auto',
        // Add small spacing before footer
        mb: { xs: 2, md: 3 }
      }}
    >
      <Container maxWidth="xl">
        <Box textAlign="center" mb={3}>
          <StyledHeading variant="h2" component="h2">
            Our Story in Chicago
          </StyledHeading>
        </Box>

        <StoryContainer>
          <FloatingAccent />
          <FloatingAccent />

          <ContentSection>
            <Grid container spacing={4} alignItems="stretch">
              <Grid item xs={12} md={6}>
                <TextContent>
                  <ParagraphText>
                    Nestled in the heart of Chicago's West Loop, Little Lemon was born from a dream of two brothers, Mario and Adrian, who wanted to bring a slice of the Mediterranean to the Windy City.
                  </ParagraphText>

                  <ParagraphText>
                    From humble beginnings as a cozy corner café, Little Lemon grew into a vibrant restaurant known for its fresh unforgettable flavors.
                  </ParagraphText>

                  <ParagraphText>
                    Whether you're here for a family dinner or a casual lunch, we serve tradition on every plate.
                  </ParagraphText>

                  <FinalQuote>
                    <QuoteText>
                      Come taste the sunshine of the Mediterranean — right here in Chicago.
                    </QuoteText>
                  </FinalQuote>
                </TextContent>
              </Grid>

              <Grid item xs={12} md={6}>
                <ImageContainer>
                  <StoryImage
                    src={MarioA}
                    alt="Mario and Adrian at Little Lemon Chicago"
                    loading="lazy"
                  />
                </ImageContainer>
              </Grid>
            </Grid>
          </ContentSection>
        </StoryContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Divider sx={{ width: '60px', height: '2px', bgcolor: '#f4ce14' }} />
        </Box>
      </Container>
    </Box>
  );
}

export default Chicago;