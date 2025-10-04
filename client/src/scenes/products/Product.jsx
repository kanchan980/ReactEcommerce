import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CartPage from "../cart/CartPage";
import Checkout from "../checkout/Checkout";

const PRODUCT_API = "http://localhost:1337/api/products?populate=*";
const CART_API = "http://localhost:1337/api/carts";

// ---------- API Helper ----------
const addProductToCartApi = async (productId, quantity = 1) => {
  try {
    const res = await fetch(CART_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { product: productId, quantity } }),
    });
    if (!res.ok) throw new Error("Failed to add product to cart");
    return (await res.json()).data;
  } catch (err) {
    console.error("Error adding to cart:", err);
    return null;
  }
};

// ---------- Styled Components ----------
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ active }) => (active ? "#7952b3" : "#ddd")};
  color: ${({ active }) => (active ? "white" : "black")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const AddToCartButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #367c39;
  }
`;

// ---------- Component ----------
function Product() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("products");

  // Fetch products from Strapi
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(PRODUCT_API);
        const data = await res.json();
        setProducts(data.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = async (product) => {
    const productId = product.id; // Strapi product ID
    const productData = product.attributes;

    const cartItem = {
      id: productId,
      strapiId: productId, // important for Checkout API
      name: productData.name,
      price: Number(productData.price) || 0,
      quantity: 1,
      image: productData.image?.data?.[0]?.attributes?.url || "",
    };

    const newItem = await addProductToCartApi(productId, 1);
    if (!newItem) return;

    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === productId);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, cartItem];
    });

    setActiveTab("cart");
  };

  const removeFromCart = (productId) =>
    setCart((prev) => prev.filter((item) => item.id !== productId));

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return removeFromCart(productId);
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Utility
  const getDescription = (desc) => {
    if (!desc) return "";
    if (typeof desc === "string") return desc;
    if (desc?.children) return desc.children.map((c) => c.text || "").join(" ");
    return "";
  };

  const getPrice = (price) => (typeof price === "number" ? `$${price}` : "$0");

  return (
    <Container>
      <Tabs>
        <TabButton
          active={activeTab === "products"}
          onClick={() => setActiveTab("products")}
        >
        
          
        </TabButton>
      </Tabs>

      {activeTab === "cart" ? (
        <CartPage
          cartItems={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      ) : (
        <ProductGrid>
          {products.map((p) => {
            const { name, description, price, status, image } = p.attributes;
            const descriptionText = getDescription(description);
            const imgUrl = image?.data?.[0]?.attributes?.url;

            return (
              <ProductCard key={p.id}>
                {imgUrl && (
                  <ProductImage
                    src={`http://localhost:1337${imgUrl}`}
                    alt={name}
                  />
                )}
                <h3>{name}</h3>
                <p>{descriptionText}</p>
                <p><b>{getPrice(price)}</b></p>
                <p>Status: {status}</p>
                <AddToCartButton onClick={() => addToCart(p)}>
                  Add to Cart
                </AddToCartButton>
              </ProductCard>
            );
          })}
        </ProductGrid>
      )}
    </Container>
  );
}

export default Product;
