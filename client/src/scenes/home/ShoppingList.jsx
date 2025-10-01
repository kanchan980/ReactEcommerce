import React, { useState, useMemo } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

// Category data with images
const categories = [
  { id: "all", label: "All", image: "https://images.pexels.com/photos/7620574/pexels-photo-7620574.jpeg" },
  { id: "womens", label: "Women's Wear", image: "https://media.istockphoto.com/id/827026918/photo/collage-of-two-beautiful-women-doing-shopping.jpg?b=1&s=612x612&w=0&k=20&c=BJpDAU8D1fvLx2KDerJUQmjllyyGHh5Oe6OD5ZQ5xa8=" },
  { id: "mens", label: "Men's Wear", image: "https://media.istockphoto.com/id/1206939050/photo/male-seller-lays-out-shirts-on-shelves-in-clothing-store.jpg?s=612x612&w=0&k=20&c=zOMpNBV7vCip5-qtVxafqkcLAq-HO9_FNJlvjjnAWOY=" },
  { id: "kids", label: "Kids Wear", image: "https://media.istockphoto.com/id/1084186840/photo/woman-and-daughter-with-purchases-in-clothing-shop.jpg?s=612x612&w=0&k=20&c=4KXca4deKvFQoXLscEPmGNrAx2qn7RGwdNfDTSpnUm4="},
];

// Full Products data
const products = [
  { id: 1, name: "", category: "womens", image: "https://images.pexels.com/photos/8387833/pexels-photo-8387833.jpeg" },
  { id: 2, name: "", category: "womens", image: "https://images.pexels.com/photos/5490969/pexels-photo-5490969.jpeg" },
  { id: 3, name: "", category: "womens", image: "https://images.pexels.com/photos/8886961/pexels-photo-8886961.jpeg" },
  { id: 4, name: "", category: "mens", image: "https://images.pexels.com/photos/5264900/pexels-photo-5264900.jpeg" },
  { id: 5, name: "", category: "mens", image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg" },
  { id: 6, name: "", category: "mens", image: "https://images.pexels.com/photos/5947550/pexels-photo-5947550.jpeg" },
  { id: 7, name: "", category: "kids", image: "https://images.pexels.com/photos/19599232/pexels-photo-19599232.jpeg" },
  { id: 8, name: "", category: "kids", image: "https://media.istockphoto.com/id/1364767669/photo/cotton-polo-shirts-in-store.jpg?s=612x612&w=0&k=20&c=bFxYwv5Storxz4p06HVzuhTfxuCcJH87TqUxvcpW8UA=" },
 
];

const ShoppingList = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const breakPoint = useMediaQuery("(min-width:600px)");

  // Filter products by selected category
  const displayedProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <Box width="90%" margin="60px auto">
      {/* Heading */}
      <Typography variant="h3" textAlign="center" gutterBottom sx={{ fontWeight: 600 }}>
        <span style={{ color: "#D87093" }}>Category</span>
      </Typography>

      {/* Category Cards */}
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={3} mb={4}>
        {categories.map(cat => (
          <motion.div
            key={cat.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              cursor: "pointer",
              border: selectedCategory === cat.id ? "3px solid #D87093" : "3px solid transparent",
              borderRadius: "20px",
              overflow: "hidden",
              width: 220,
              textAlign: "center",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={cat.image}
              alt={cat.label}
              style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: "20px 20px 0 0" }}
            />
            <Typography variant="h6" sx={{ p: 1 }}>
              {cat.label}
            </Typography>
          </motion.div>
        ))}
      </Box>

      {/* Products Grid */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "repeat(auto-fill, minmax(250px, 1fr))", sm: "repeat(auto-fill, 300px)" }}
        justifyContent="center"
        gap="20px"
      >
        {displayedProducts.length > 0 ? (
          displayedProducts.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <Box
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
                  backgroundColor: "#fff",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />
                <Typography variant="h6" sx={{ p: 2 }}>
                  {item.name}
                </Typography>
              </Box>
            </motion.div>
          ))
        ) : (
          <Typography textAlign="center" mt={4}>
            No products available in this category.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ShoppingList;
