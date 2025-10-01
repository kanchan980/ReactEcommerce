// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, Box, IconButton, Typography } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { MenuOutlined } from "@mui/icons-material"; // removed FavoriteBorderOutlined
import { shades } from "../../theme";

export default function Navbar() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);

  const [products, setProducts] = useState([]);

  // Fetch products for search (optional, can be removed)
  useEffect(() => {
    fetch("http://localhost:1337/api/products?populate=*")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []))
      .catch(console.error);
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      bgcolor="rgba(255,255,255,0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="10"
      boxShadow="0px 1px 4px rgba(0,0,0,0.1)"
    >
      <Box
        width="90%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Logo */}
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[500]}
          fontWeight="bold"
          fontSize="1.3rem"
        >
          ECOMMER
        </Box>

        {/* Navigation Links */}
        <Box display={{ xs: "none", md: "flex" }} columnGap="20px" alignItems="center">
          {["Home", "Product", "About", "Contact"].map((link) => (
            <Typography
              key={link}
              onClick={() => navigate(`/${link === "Home" ? "" : link.toLowerCase()}`)}
              sx={{
                fontSize: "0.95rem",
                "&:hover": { cursor: "pointer", color: shades.primary[300] },
              }}
            >
              {link}
            </Typography>
          ))}
        </Box>

        {/* Icons */}
        <Box display="flex" alignItems="center" columnGap="15px" zIndex="2">
          {/* Cart Icon with Badge */}
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 2,
                top: 2,
                padding: "0 4px",
                height: "16px",
                minWidth: "16px",
                fontSize: "0.7rem",
                backgroundColor: "#f44336",
                color: "white",
              },
            }}
          >
            <IconButton
              onClick={() => navigate("/cart")}
              sx={{ color: "black" }}
              disableRipple
            >
              <FaShoppingCart size={22} />
            </IconButton>
          </Badge>

          {/* Mobile Menu */}
          <IconButton
            sx={{ color: "black", display: { xs: "flex", md: "none" } }}
            onClick={() => navigate("/menu")}
            disableRipple
          >
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
