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
    { icon: <Restaurant sx={{ color: '#495e57' }} />, text: "Fresh Ingredients" },
    { icon: <Schedule sx={{ color: '#495e57' }} />, text: "Quick Service" },
    { icon: <Star sx={{ color: '#f4ce14' }} />, text: "5-Star Experience" }
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#f4ce14',
        borderRadius: { xs: '12px', sm: '16px' },
        color: '#000',
        padding: {
          xs: '2.5rem 1rem 2rem',
          sm: '3rem 1.5rem 1.5rem',
          md: '4rem 2rem 1rem'
        },
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

        {/* Floating decoration icons - Hidden below 750px */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
            '@media (max-width: 750px)': {
              display: 'none !important'
            },
            position: 'absolute',
            top: { md: -15 },
            left: { md: -20 },
            opacity: 0.3,
            fontSize: { md: '2rem' },
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
            display: { xs: 'none', sm: 'none', md: 'block' },
            '@media (max-width: 750px)': {
              display: 'none !important'
            },
            position: 'absolute',
            top: { md: -15 },
            right: { md: -20 },
            opacity: 0.3,
            fontSize: { md: '2rem' },
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
            display: { xs: 'none', sm: 'none', md: 'block' },
            '@media (max-width: 750px)': {
              display: 'none !important'
            },
            position: 'absolute',
            bottom: { md: 90 },
            left: { md: -25 },
            opacity: 0.3,
            fontSize: { md: '2rem' },
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
            display: { xs: 'none', sm: 'none', md: 'block' },
            '@media (max-width: 750px)': {
              display: 'none !important'
            },
            position: 'absolute',
            bottom: { md: 90 },
            right: { md: -25 },
            opacity: 0.3,
            fontSize: { md: '2rem' },
            animation: 'floatIcon4 4s ease-in-out infinite 0.5s',
            '@keyframes floatIcon4': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-20px) rotate(-4deg)' }
            }
          }}
        >
          🌟
        </Box>

        {/* Enhanced mobile animation - Active below 750px */}
        <Box
          sx={{
            display: 'none',
            '@media (max-width: 750px)': {
              display: 'block !important'
            },
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '150%',
            height: '150%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.05) 40%, transparent 70%)',
            animation: 'mobileGlow 5s ease-in-out infinite',
            borderRadius: '50%',
            '@keyframes mobileGlow': {
              '0%, 100%': {
                opacity: 0.4,
                transform: 'translate(-50%, -50%) scale(1) rotate(0deg)'
              },
              '33%': {
                opacity: 0.7,
                transform: 'translate(-50%, -50%) scale(1.1) rotate(120deg)'
              },
              '66%': {
                opacity: 0.5,
                transform: 'translate(-50%, -50%) scale(0.95) rotate(240deg)'
              }
            }
          }}
        />

        {/* Additional mobile sparkle effect */}
        <Box
          sx={{
            display: 'none',
            '@media (max-width: 750px)': {
              display: 'block !important'
            },
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: '8px',
            height: '8px',
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '50%',
            animation: 'sparkle1 3s ease-in-out infinite',
            '@keyframes sparkle1': {
              '0%, 100%': { opacity: 0, transform: 'scale(0)' },
              '50%': { opacity: 1, transform: 'scale(1)' }
            }
          }}
        />

        <Box
          sx={{
            display: 'none',
            '@media (max-width: 750px)': {
              display: 'block !important'
            },
            position: 'absolute',
            top: '30%',
            right: '25%',
            width: '6px',
            height: '6px',
            background: 'rgba(255,255,255,0.6)',
            borderRadius: '50%',
            animation: 'sparkle2 3s ease-in-out infinite 1s',
            '@keyframes sparkle2': {
              '0%, 100%': { opacity: 0, transform: 'scale(0)' },
              '50%': { opacity: 1, transform: 'scale(1)' }
            }
          }}
        />

        <Box
          sx={{
            display: 'none',
            '@media (max-width: 750px)': {
              display: 'block !important'
            },
            position: 'absolute',
            bottom: '35%',
            left: '15%',
            width: '10px',
            height: '10px',
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '50%',
            animation: 'sparkle3 3s ease-in-out infinite 2s',
            '@keyframes sparkle3': {
              '0%, 100%': { opacity: 0, transform: 'scale(0)' },
              '50%': { opacity: 1, transform: 'scale(1)' }
            }
          }}
        />

        {/* Main heading with improved responsive sizing */}
        <Fade in timeout={800}>
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: '1.8rem',
                sm: '2.2rem',
                md: '2.5rem'
              },
              marginBottom: { xs: '0.4rem', sm: '0.5rem', md: '0.5rem' },
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

        {/* Subtitle with improved responsive sizing */}
        <Fade in timeout={1000}>
          <Typography
            variant="body1"
            sx={{
              fontSize: {
                xs: '1rem',
                sm: '1.1rem',
                md: '1.125rem'
              },
              marginBottom: { xs: '1.8rem', sm: '2rem', md: '2rem' },
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

        {/* Feature chips with improved responsive sizing */}
        <Fade in={showFeatures} timeout={1200}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.2}
            justifyContent="center"
            alignItems="center"
            sx={{ marginBottom: { xs: '2.2rem', sm: '2.5rem', md: '2.5rem' } }}
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
                    fontSize: { xs: '0.9rem', sm: '0.9rem' },
                    borderRadius: '25px',
                    backdropFilter: 'blur(10px)',
                    padding: { xs: '0.4rem 0.8rem', sm: '0.5rem 0.8rem' },
                    height: { xs: '40px', sm: '44px' },
                    animation: `bounceIn 0.6s ease-out ${index * 0.2}s both`,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.4)',
                      transform: 'translateY(-5px) scale(1.05)',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                    },
                    '& .MuiChip-icon': {
                      fontSize: { xs: '1.2rem', sm: '1.4rem' }
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

        {/* Fixed CTA Button with same size for both states */}
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
              padding: {
                xs: '0.6rem 1.8rem',
                sm: '0.7rem 2rem',
                md: '0.75rem 2.2rem'
              },
              borderRadius: { xs: '12px', sm: '14px', md: '16px' },
              fontWeight: 'bold',
              fontSize: {
                xs: '0.9rem',
                sm: '1rem',
                md: '1rem'
              },
              border: '2px solid #000000',
              textTransform: 'none',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: { xs: '2.5rem', sm: '2.8rem', md: '3rem' },
              animation: 'slideInUp 1.2s ease-out 0.9s both',
              minWidth: { xs: '180px', sm: '200px', md: '220px' },
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
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: isHovered ? '100%' : '0%',
                height: '100%',
                background: 'rgba(73, 94, 87, 0.1)',
                borderRadius: 'inherit',
                transition: 'width 0.3s ease',
                zIndex: 1
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
                },
                '& .button-text': {
                  opacity: isHovered ? 1 : 0.8
                }
              },
              '&:active': {
                transform: 'translateY(-1px) scale(1.02)'
              },
              '& .MuiButton-endIcon': {
                transition: 'transform 0.3s ease',
                fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.2rem' },
                zIndex: 2
              },
              '& .button-text': {
                position: 'relative',
                zIndex: 2,
                transition: 'opacity 0.3s ease'
              },
              transition: 'all 0.4s ease',
              '@keyframes slideInUp': {
                from: { opacity: 0, transform: 'translateY(50px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            <span className="button-text">
              {isHovered ? 'Let\'s Go!' : 'Reserve a Table'}
            </span>
          </Button>
        </Zoom>

        {/* Properly positioned pulsing dots with improved responsive sizing */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 15, sm: 18, md: 20 },
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: { xs: 1, sm: 1, md: 1 },
            zIndex: 3
          }}
        >
          {[0, 1, 2].map((index) => (
            <Box
              key={index}
              sx={{
                width: { xs: 10, sm: 11, md: 10 },
                height: { xs: 10, sm: 11, md: 10 },
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