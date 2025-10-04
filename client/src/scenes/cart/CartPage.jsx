import React, { useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import styled from "styled-components";
import Checkout from "../checkout/Checkout";

// API helper
const getCartItems = async () => {
  try {
    const res = await fetch("http://localhost:1337/api/carts?populate[product][populate]=*");
    if (!res.ok) throw new Error("Failed to fetch cart");
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("Error fetching cart:", err);
    return [];
  }
};

// Styled components
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
`;

function CartPage({ onBack }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError("");
      try {
        const items = await getCartItems();
        setCart(items);
      } catch (err) {
        setError("Unable to load cart. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const removeFromCart = async (cartId) => {
    try {
      const res = await fetch(`http://localhost:1337/api/carts/${cartId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove item");
      setCart((prev) => prev.filter((item) => item.id !== cartId));
    } catch (err) {
      console.error(err);
      alert("Error removing item");
    }
  };

  const getProduct = (item) => item.attributes?.product?.data?.attributes || {};
  const getPrice = (item) => {
    const price = getProduct(item)?.price;
    return !isNaN(price) ? Number(price) : 0;
  };

  const totalPrice = cart.reduce((acc, item) => {
    const quantity = item.attributes?.quantity || 1;
    return acc + getPrice(item) * quantity;
  }, 0);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (showCheckout) {
    return (
      <Checkout
        cartItems={cart}
        totalPrice={totalPrice}
        onBack={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <Box width="90%" maxWidth="1000px" m="50px auto">
      <Typography variant="h4" mb={3}>Your Cart</Typography>

      {error && <Typography color="error">{error}</Typography>}

      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <ProductGrid>
            {cart.map((item) => {
              const product = getProduct(item);
              const imgUrl =
                product.image?.data?.[0]?.attributes?.url
                  ? `http://localhost:1337${product.image.data[0].attributes.url}`
                  : "https://via.placeholder.com/180";

              return (
                <ProductCard key={item.id}>
                  <ProductImage src={imgUrl} alt={product.name || "Product"} />
                  <Typography variant="h6">{product.name || "No Name"}</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {product.description || ""}
                  </Typography>
                  <Typography>Quantity: {item.attributes?.quantity || 1}</Typography>
                  <Typography fontWeight="bold">
                    Price: ${getPrice(item).toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                    sx={{ mt: 1 }}
                  >
                    Remove
                  </Button>
                </ProductCard>
              );
            })}
          </ProductGrid>

          <Box display="flex" justifyContent="space-between" mt={4} flexWrap="wrap" gap={2}>
            <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
            <Button variant="contained" color="primary" onClick={() => setShowCheckout(true)}>
              Checkout
            </Button>
          </Box>
        </>
      )}

      <Button variant="outlined" sx={{ mt: 3 }} onClick={onBack}>
        Back
      </Button>
    </Box>
  );
}

export default CartPage;
