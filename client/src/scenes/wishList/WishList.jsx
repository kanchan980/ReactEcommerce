import React, { useEffect, useState } from "react";
import styled from "styled-components";

const WISHLIST_API = "http://localhost:1337/api/wishlists";

const WishlistContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  font-family: "Arial, sans-serif";
`;

const WishlistItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const RemoveButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background-color: #e60000;
  }
`;

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

 
  const fetchWishlist = async () => {
    if (!token || !userId) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${WISHLIST_API}?filters[user][id][$eq]=${userId}&populate=products`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setWishlist(data.data || []);
      console.log("Fetched wishlist:", data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };


  const removeFromWishlist = async (wishlistId, productId) => {
    try {
      const item = wishlist.find((w) => w.id === wishlistId);
      if (!item) return;

      const updatedProducts = item.attributes.products.data
        .filter((p) => p.id !== productId)
        .map((p) => p.id);

      const res = await fetch(`${WISHLIST_API}/${wishlistId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: { products: updatedProducts } }),
      });

      if (!res.ok) throw new Error("Failed to remove product");

      // Update local state without refetching
      setWishlist((prev) =>
        prev.map((w) =>
          w.id === wishlistId
            ? { ...w, attributes: { ...w.attributes, products: { data: w.attributes.products.data.filter((p) => p.id !== productId) } } }
            : w
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error removing item");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token, userId]);

  if (loading) return <p>Loading wishlist...</p>;
  if (!wishlist.length) return <p>No items in your wishlist.</p>;

  return (
    <WishlistContainer>
      <h2>My Wishlist</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {wishlist.map((item) =>
          item.attributes.products.data.map((product) => (
            <WishlistItem key={product.id}>
              <span>
                {product.attributes.name} - ₹{product.attributes.price}
              </span>
              <RemoveButton
                onClick={() => removeFromWishlist(item.id, product.id)}
              >
                Remove
              </RemoveButton>
            </WishlistItem>
          ))
        )}
      </ul>
    </WishlistContainer>
  );
};

export default Wishlist;
