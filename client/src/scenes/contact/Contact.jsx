import { Box, Typography, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";

function Contact() {
  return (
    <Box>
      {/* Top Banner with Gradient Overlay and Animation */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
            width: "100%",
            height: { xs: "200px", md: "300px" },
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            mb: 4,
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {/* Background Image */}
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80"
            alt="Contact Banner"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />

          {/* Gradient Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to right, rgba(123,31,162,0.7), rgba(32,150,243,0.7))",
              zIndex: 2,
            }}
          />

          {/* Text */}
          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            sx={{ zIndex: 3 }}
          >
            Contact Us
          </Typography>
        </Box>
      </motion.div>

      {/* Contact Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Box
          width="clamp(20%, 40%, 60%)"
          mx="auto"
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          boxShadow={3}
          borderRadius="12px"
          bgcolor="white"
        >
          {/* Subheader */}
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Let’s Start a Conversation
          </Typography>

          <Typography textAlign="center" color="text.secondary">
            Ask how we can help you
          </Typography>

          {/* Contact Form */}
          <Box
            component="form"
            display="grid"
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
            gap={2}
            mt={2}
          >
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              required
            />
            <TextField label="Last Name" variant="outlined" fullWidth required />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              sx={{ gridColumn: { xs: "1 / -1", sm: "span 2" } }}
            />
            <TextField
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              required
              sx={{ gridColumn: "1 / -1" }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                gridColumn: "1 / -1",
                "&:hover": { scale: 1.05, transition: "0.3s" },
              }}
            >
              Send Message
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}

export default Contact;
