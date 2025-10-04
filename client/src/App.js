import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Scenes
import Home from "./scenes/home/Home";
import Product from "./scenes/products/Product";
import About from "./scenes/about/About";
import Contact from "./scenes/contact/Contact";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Wishlist from "./scenes/wishList/WishList";
import Cart from "./scenes/cart/CartPage";

// Components
import Item from "./components/Item";

// Global components
import Navbar from "./scenes/global/Navbar";
import Footer from "./scenes/global/Footer";
import CartMenu from "./scenes/global/CartMenu";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/item/:itemId" element={<ItemDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<Confirmation />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/item" element={<Item />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
