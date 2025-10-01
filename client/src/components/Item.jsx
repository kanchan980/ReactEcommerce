import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  // ✅ Safe destructuring
  const { category, price, name, image } = item?.attributes || {};

  // ✅ Safe image extraction
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:1337/api/items";
  const urlx = image?.data?.attributes?.url || "";
  const imageUrl = urlx ? `${backendUrl}${urlx}` : "/placeholder.png";

  return (
    <Box width={width}>
      {/* Product Image with Hover */}
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={name || "Product"}
          src={imageUrl}
          style={{ cursor: "pointer", width: "100%", height: "auto" }}
          onClick={() => navigate(`/item/${item?.id}`)}
        />

        {/* Hover Overlay */}
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            {/* Quantity Selector */}
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>

            {/* Add to Cart */}
            <Button
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Product Details */}
      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category
            ? category
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())
            : "Uncategorized"}
        </Typography>
        <Typography>{name || "Unnamed Product"}</Typography>
        <Typography fontWeight="bold">
          {price
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(price)
            : "$0.00"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Item;
