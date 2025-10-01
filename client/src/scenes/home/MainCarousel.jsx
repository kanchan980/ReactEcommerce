import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Container,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

// Images
const heroImage =
  'https://media.istockphoto.com/id/1835592211/photo/female-customer-picking-piece-of-clothing-from-rack.jpg?b=1&s=612x612&w=0&k=20&c=RDUNOR-KenRAArEn6nKtjAgSBcMrZ0Ct9AHcRbFfz3w=';
const welcomeImage =
  'https://images.pexels.com/photos/6044261/pexels-photo-6044261.jpeg';

// Shopping features
const shoppingFeatures = [
  { title: 'Latest Trends', description: 'Stay trendy with our latest collection.' },
  { title: 'Affordable Prices', description: 'Fashion that fits your budget.' },
  { title: 'Fast Delivery', description: 'Get your orders delivered quickly.' },
  { title: 'Easy Returns', description: 'Hassle-free returns within 30 days.' },
];

// Sample products
const products = [
  {
    id: 1,
    name: 'Floral Dress',
    image: 'https://images.pexels.com/photos/6311390/pexels-photo-6311390.jpeg',
  },
  {
    id: 2,
    name: 'Casual Shirt',
    image: 'https://images.pexels.com/photos/5418921/pexels-photo-5418921.jpeg',
  },
  {
    id: 3,
    name: 'Denim Jacket',
    image: 'https://images.pexels.com/photos/16390585/pexels-photo-16390585.jpeg',
  },
  {
    id: 4,
    name: 'Jeans',
    image: 'https://images.pexels.com/photos/17139455/pexels-photo-17139455.jpeg',
  },
];

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#F8E8EE',
  position: 'relative',
  overflow: 'hidden',
}));

const CurvedBottom = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100px',
  backgroundColor: '#fff',
  borderTopLeftRadius: '50%',
  borderTopRightRadius: '50%',
  transform: 'translateY(50%)',
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

// Framer Motion animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const FemininePage = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" color="inherit" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6" sx={{ flexGrow: 1, color: '#D87093' }}>
              ShopEase
            </Typography>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Shop</Button>
            <Button color="inherit">Collections</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Text */}
            <Grid item xs={12} md={6}>
              <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                <Typography variant="h4" gutterBottom>
                  Discover Your Style with ShopEase
                </Typography>
                <Typography variant="body1" paragraph>
                  Explore our curated collections and find your perfect outfit. Fashion meets comfort and style.
                </Typography>
                <Button variant="contained" color="primary">
                  Shop Now
                </Button>
              </motion.div>
            </Grid>

            {/* Image */}
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <Box
                  component="img"
                  src={heroImage}
                  alt="Hero Shopping"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    maxHeight: '500px',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        <CurvedBottom />
      </HeroSection>

      {/* Welcome / Feature Section */}
      <Section>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Image */}
            <Grid item xs={12} md={6}>
              <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                <Box
                  component="img"
                  src={welcomeImage}
                  alt="Shopping Collection"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    maxHeight: '400px',
                  }}
                />
              </motion.div>
            </Grid>

            {/* Features */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Why Shop With Us
                </Typography>
                <Typography variant="body1" paragraph>
                  ShopEase offers the latest trends, affordable prices, and fast delivery. Enjoy a seamless shopping experience.
                </Typography>
                <Grid container spacing={2}>
                  {shoppingFeatures.map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                      >
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: '#F8E8EE',
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6">{feature.title}</Typography>
                          <Typography variant="body2">{feature.description}</Typography>
                        </Box>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Section>

      {/* Product Grid Section */}
      <Section sx={{ backgroundColor: '#F8E8EE' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Shop Our Collection
          </Typography>
          <Grid container spacing={4} mt={4}>
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{ width: '100%', height: 250, objectFit: 'cover' }}
                  />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6">{product.name}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>
    </Box>
  );
};

export default FemininePage;
