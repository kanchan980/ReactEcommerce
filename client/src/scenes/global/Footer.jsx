import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";
import { Link } from "react-router-dom"; // ✅ Import Link

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  };

  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        {/* Company Info */}
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            ECOMMER
          </Typography>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </Box>

        {/* About Us */}
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">
            <Link to="/about" style={linkStyle}>About</Link>
          </Typography>
          <Typography mb="30px">
            <Link to="/careers" style={linkStyle}>Careers</Link>
          </Typography>
          <Typography mb="30px">
            <Link to="/stores" style={linkStyle}>Our Stores</Link>
          </Typography>
          <Typography mb="30px">
            <Link to="/terms" style={linkStyle}>Terms & Conditions</Link>
          </Typography>
          <Typography mb="30px">
            <Link to="/privacy" style={linkStyle}>Privacy Policy</Link>
          </Typography>
        </Box>

        {/* Customer Care */}
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">
            <Link to="/help" style={linkStyle}>Help Center</Link>
          </Typography>
          <Typography mb="30px">
            <Link to="/track-order" style={linkStyle}>Track Your Order</Link>
          </Typography>
          <Typography mb="30px">
            <Link to="/corporate" style={linkStyle}>Corporate & Bulk Purchasing</Link>
          </Typography>
          <Typography mb="30px">
            <Link to="/returns" style={linkStyle}>Returns & Refunds</Link>
          </Typography>
        </Box>

        {/* Contact Us */}
        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">
            50 north Whatever Blvd, Washington, DC 10501
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            Email: <Link to="/contact" style={linkStyle}>mredwardroh@gmail.com</Link>
          </Typography>
          <Typography mb="30px">(222)333-4444</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
