import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Fade,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  ArrowUpward,
} from '@mui/icons-material';

function Footer() {
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log('Newsletter subscription:', email);
      setEmail('');
      alert('Thank you for subscribing to our newsletter!');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <Facebook />, url: 'https://facebook.com', name: 'Facebook' },
    { icon: <Instagram />, url: 'https://instagram.com', name: 'Instagram' },
    { icon: <Twitter />, url: 'https://twitter.com', name: 'Twitter' },
    { icon: <LinkedIn />, url: 'https://linkedin.com', name: 'LinkedIn' },
  ];

  const quickLinks = [
    { text: 'Home', url: '/' },
    { text: 'About', url: '/about' },
    { text: 'Menu', url: '/menu' },
    { text: 'Contact', url: '/contact' },
  ];

  const services = [
    'Dine In Experience',
    'Online Ordering',
    'Catering Services',
    'Private Events',
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #495e57 0%, #3a4c47 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 70%, rgba(244, 206, 20, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, md: 4 } }}>
        <Fade in timeout={1000}>
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <Grid container spacing={{ xs: 6, md: 8.5 }} sx={{ justifyContent: 'center' }}>

              {/* Company Bio Section */}
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#f4ce14',
                      mb: 2,
                      animation: 'fadeInUp 0.8s ease-out',
                    }}
                  >
                    Little Lemon
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      fontSize: "0.9rem",
                      lineHeight: 1.8,
                      animation: 'fadeInUp 0.8s ease-out 0.2s both',
                      maxWidth: { md: '250px' },
                      mx: { xs: 'auto', md: 0 },
                    }}
                  >
                    A family-owned Mediterranean restaurant serving authentic flavors
                    with fresh ingredients and traditional recipes passed down through
                    generations.
                  </Typography>

                  {/* Social Links */}
                  <Box sx={{
                    display: 'flex',
                    gap: 1,
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    flexWrap: 'wrap',
                    ml: { xs: 0, md: -1 } // Align with text start
                  }}>
                    {socialLinks.map((social, index) => (
                      <IconButton
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: 'white',
                          transition: 'all 0.3s ease',
                          animation: `fadeInUp 0.8s ease-out ${0.4 + index * 0.1}s both`,
                          '&:hover': {
                            color: '#f4ce14',
                            transform: 'translateY(-3px) scale(1.1)',
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </Grid>

              {/* Quick Links */}
              <Grid item xs={12} sm={6} md={2}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#f4ce14',
                      mb: 2,
                      fontWeight: 'bold',
                      animation: 'fadeInUp 0.8s ease-out 0.3s both',
                    }}
                  >
                    Quick Links
                  </Typography>
                  <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                    {quickLinks.map((link, index) => (
                      <Box
                        component="li"
                        key={link.text}
                        sx={{
                          mb: 1,
                          animation: `fadeInUp 0.8s ease-out ${0.5 + index * 0.1}s both`,
                        }}
                      >
                        <Link
                          href={link.url}
                          variant="body2"
                          sx={{
                            color: 'white',
                            fontSize: "0.9rem",
                            textDecoration: 'none',
                            py: 0.5,
                            display: 'block',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              color: '#f4ce14',
                            },
                          }}
                        >
                          {link.text}
                        </Link>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>

              {/* Services */}
              <Grid item xs={12} sm={6} md={2}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#f4ce14',
                      mb: 2,
                      fontWeight: 'bold',
                      animation: 'fadeInUp 0.8s ease-out 0.4s both',
                    }}
                  >
                    Our Services
                  </Typography>
                  <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                    {services.map((service, index) => (
                      <Box
                        component="li"
                        key={service}
                        sx={{
                          mb: 1,
                          animation: `fadeInUp 0.8s ease-out ${0.6 + index * 0.1}s both`,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'white',
                            fontSize: "0.9rem",
                            py: 0.5,
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                              color: '#f4ce14',
                            },
                          }}
                        >
                          {service}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>

              {/* Contact Info */}
              <Grid item xs={12} sm={6} md={2}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#f4ce14',
                      mb: 2,
                      fontWeight: 'bold',
                      animation: 'fadeInUp 0.8s ease-out 0.5s both',
                    }}
                  >
                    Contact Us
                  </Typography>
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        animation: 'fadeInUp 0.8s ease-out 0.7s both',
                      }}
                    >
                      <Email sx={{ mr: 1, fontSize: "0.9rem", color: '#f4ce14' }} />
                      <Typography variant="body2">info@littlelemon.com</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        animation: 'fadeInUp 0.8s ease-out 0.8s both',
                      }}
                    >
                      <Phone sx={{ mr: 1, fontSize: "0.9rem", color: '#f4ce14' }} />
                      <Typography variant="body2">+1 (123) 456-7890</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        animation: 'fadeInUp 0.8s ease-out 0.9s both',
                      }}
                    >
                      <LocationOn sx={{ mr: 1, fontSize: "0.9rem", color: '#f4ce14', mt: 0.2 }} />
                      <Typography variant="body2">123 Main St, Chicago, IL</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Newsletter Subscription */}
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: { md: '280px' }, mx: { xs: 'auto', md: 0 } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#f4ce14',
                      mb: 2,
                      fontWeight: 'bold',
                      animation: 'fadeInUp 0.8s ease-out 0.6s both',
                    }}
                  >
                    Newsletter
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      fontSize: "0.9rem",
                      color: 'rgba(255, 255, 255, 0.9)',
                      animation: 'fadeInUp 0.8s ease-out 0.7s both',
                    }}
                  >
                    Get special offers and updates!
                  </Typography>
                  <Box component="form" onSubmit={handleNewsletterSubmit}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size="small"
                      type="email"
                      required
                      sx={{
                        mb: 1,
                        animation: 'fadeInUp 0.8s ease-out 0.8s both',
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          '& fieldset': {
                            borderColor: 'rgba(244, 206, 20, 0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: '#f4ce14',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#f4ce14',
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                          fontSize: '0.875rem',
                          '&::placeholder': {
                            color: 'rgba(255, 255, 255, 0.7)',
                          },
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: '#f4ce14',
                        color: '#495e57',
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        animation: 'fadeInUp 0.8s ease-out 0.9s both',
                        '&:hover': {
                          backgroundColor: '#e6b800',
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Subscribe
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Scroll to Top Button */}
            <Fade in={showScrollTop}>
              <IconButton
                onClick={scrollToTop}
                sx={{
                  position: 'fixed',
                  bottom: 20,
                  right: 20,
                  backgroundColor: '#f4ce14',
                  color: '#495e57',
                  width: 50,
                  height: 50,
                  zIndex: 1000,
                  '&:hover': {
                    backgroundColor: '#e6b800',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                  animation: 'bounce 2s infinite',
                }}
              >
                <ArrowUpward />
              </IconButton>
            </Fade>

            {/* Divider with Animation */}
            <Divider
              sx={{
                my: 4,
                borderColor: 'rgba(244, 206, 20, 0.3)',
                animation: 'expandWidth 1.5s ease-out 1s both',
              }}
            />

            {/* Bottom Section */}
            <Fade in timeout={2000}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                  pt: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    animation: 'fadeInUp 0.8s ease-out 1.2s both',
                  }}
                >
                  &copy; 2025 Little Lemon. All rights reserved.
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    gap: 3,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    animation: 'fadeInUp 0.8s ease-out 1.4s both',
                  }}
                >
                  <Link
                    href="#"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#f4ce14',
                      },
                    }}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#f4ce14',
                      },
                    }}
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#f4ce14',
                      },
                    }}
                  >
                    Sitemap
                  </Link>
                </Box>
              </Box>
            </Fade>
          </Box>
        </Fade>
      </Container>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(244, 206, 20, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(244, 206, 20, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(244, 206, 20, 0);
          }
        }
      `}</style>
    </Box>
  );
}

export default Footer;