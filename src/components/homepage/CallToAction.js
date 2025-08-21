import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Fade,
  Zoom,
  Chip,
  Stack
} from '@mui/material';
import {
  Restaurant,
  Schedule,
  Star,
  ArrowForward
} from '@mui/icons-material';

function CallToAction() {
  const [isHovered, setIsHovered] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowFeatures(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { icon: <Restaurant />, text: "Fresh Ingredients" },
    { icon: <Schedule />, text: "Quick Service" },
    { icon: <Star />, text: "5-Star Experience" }
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#f4ce14',
        borderRadius: '16px',
        color: '#000',
        padding: { xs: '3.5rem 1rem 5rem', md: '4rem 2rem 1rem' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '3rem',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        animation: 'fadeIn 1s ease-out',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(5deg)' }
          }
        },
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        }
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>

        {/* Four properly aligned floating decoration icons */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: -10, md: -15 },
            left: { xs: -15, md: -20 },
            opacity: 0.3,
            fontSize: { xs: '1.5rem', md: '2rem' },
            animation: 'floatIcon1 4s ease-in-out infinite',
            '@keyframes floatIcon1': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-15px) rotate(3deg)' }
            }
          }}
        >
          🍋
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: { xs: -10, md: -15 },
            right: { xs: -15, md: -20 },
            opacity: 0.3,
            fontSize: { xs: '1.5rem', md: '2rem' },
            animation: 'floatIcon2 4s ease-in-out infinite 1s',
            '@keyframes floatIcon2': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-18px) rotate(-3deg)' }
            }
          }}
        >
          🍽️
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 80, md: 90 },
            left: { xs: -20, md: -25 },
            opacity: 0.3,
            fontSize: { xs: '1.5rem', md: '2rem' },
            animation: 'floatIcon3 4s ease-in-out infinite 2s',
            '@keyframes floatIcon3': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-12px) rotate(5deg)' }
            }
          }}
        >
          ✨
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 80, md: 90 },
            right: { xs: -20, md: -25 },
            opacity: 0.3,
            fontSize: { xs: '1.5rem', md: '2rem' },
            animation: 'floatIcon4 4s ease-in-out infinite 0.5s',
            '@keyframes floatIcon4': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-20px) rotate(-4deg)' }
            }
          }}
        >
          🌟
        </Box>

        {/* Main heading with animation */}
        <Fade in timeout={800}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              marginBottom: '0.5rem',
              fontWeight: 600,
              lineHeight: 1.2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              animation: 'slideInDown 0.8s ease-out',
              '@keyframes slideInDown': {
                from: { opacity: 0, transform: 'translateY(-50px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            Ready to Book Your Table?
          </Typography>
        </Fade>

        {/* Subtitle with animation */}
        <Fade in timeout={1000}>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              marginBottom: '2rem',
              fontWeight: 500,
              opacity: 0.9,
              animation: 'slideInUp 1s ease-out 0.3s both',
              '@keyframes slideInUp': {
                from: { opacity: 0, transform: 'translateY(50px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            Reserve now and enjoy the Little Lemon experience!
          </Typography>
        </Fade>

        {/* Feature chips */}
        <Fade in={showFeatures} timeout={1200}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{ marginBottom: '2.5rem' }}
          >
            {features.map((feature, index) => (
              <Zoom
                key={feature.text}
                in={showFeatures}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
              >
                <Chip
                  icon={feature.icon}
                  label={feature.text}
                  variant="outlined"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(0,0,0,0.2)',
                    color: '#000',
                    fontWeight: 500,
                    borderRadius: '25px',
                    backdropFilter: 'blur(10px)',
                    animation: `bounceIn 0.6s ease-out ${index * 0.2}s both`,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.4)',
                      transform: 'translateY(-5px) scale(1.05)',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                    },
                    transition: 'all 0.3s ease',
                    '@keyframes bounceIn': {
                      '0%': { opacity: 0, transform: 'scale(0.3)' },
                      '50%': { transform: 'scale(1.05)' },
                      '70%': { transform: 'scale(0.9)' },
                      '100%': { opacity: 1, transform: 'scale(1)' }
                    }
                  }}
                />
              </Zoom>
            ))}
          </Stack>
        </Fade>

        {/* Enhanced CTA Button with proper hover */}
        <Zoom in timeout={1400}>
          <Button
            href="/booking"
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
              background: 'linear-gradient(45deg, #fff 0%, #f8f9fa 100%)',
              color: '#000000',
              padding: { xs: '0.65rem 1.5rem', md: '0.75rem 2rem' },
              borderRadius: '16px',
              fontWeight: 'bold',
              fontSize: { xs: '0.95rem', md: '1rem' },
              border: '2px solid #000000',
              textTransform: 'none',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '3rem', // Add space above dots
              animation: 'slideInUp 1.2s ease-out 0.9s both',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                transition: 'left 0.6s ease'
              },
              '&:hover': {
                background: '#495e57 !important',
                color: '#f4ce14 !important',
                borderColor: '#495e57',
                transform: 'translateY(-3px) scale(1.05)',
                boxShadow: '0 10px 30px rgba(73, 94, 87, 0.4)',
                '&::before': {
                  left: '100%'
                },
                '& .MuiButton-endIcon': {
                  transform: 'translateX(5px)'
                }
              },
              '&:active': {
                transform: 'translateY(-1px) scale(1.02)'
              },
              '& .MuiButton-endIcon': {
                transition: 'transform 0.3s ease'
              },
              transition: 'all 0.4s ease',
              '@keyframes slideInUp': {
                from: { opacity: 0, transform: 'translateY(50px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            {isHovered ? 'Let\'s Go!' : 'Reserve a Table'}
          </Button>
        </Zoom>

        {/* Properly positioned pulsing dots */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 3
          }}
        >
          {[0, 1, 2].map((index) => (
            <Box
              key={index}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: 'rgba(73, 94, 87, 0.6)',
                animation: `pulseSequence 3s ease-in-out infinite ${index * 0.5}s`,
                '@keyframes pulseSequence': {
                  '0%, 70%, 100%': { transform: 'scale(1)', opacity: 0.6 },
                  '35%': { transform: 'scale(1.3)', opacity: 1 }
                }
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default CallToAction;