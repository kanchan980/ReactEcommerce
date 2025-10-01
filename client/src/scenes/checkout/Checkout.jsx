import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Shipping from "./Shipping";
import Payment from "./Payment";

const steps = ["Billing & Shipping", "Payment"];

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      country: yup.string().required("Required"),
      street1: yup.string().required("Required"),
      street2: yup.string(),
      city: yup.string().required("Required"),
      state: yup.string().required("Required"),
      zipCode: yup.string().required("Required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", { is: false, then: yup.string().required("Required") }),
      lastName: yup.string().when("isSameAddress", { is: false, then: yup.string().required("Required") }),
      country: yup.string().when("isSameAddress", { is: false, then: yup.string().required("Required") }),
      street1: yup.string().when("isSameAddress", { is: false, then: yup.string().required("Required") }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", { is: false, then: yup.string().required("Required") }),
      state: yup.string().when("isSameAddress", { is: false, then: yup.string().required("Required") }),
      zipCode: yup.string().when("isSameAddress", { is: false, then: yup.string().required("Required") }),
    }),
  }),
  yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    phoneNumber: yup.string().required("Required"),
  }),
];

const Checkout = ({ cartItems = [], totalPrice = 0, onBack }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [validProducts, setValidProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Map cart items and include Strapi image URLs
  const mapProductsForOrder = (items) => {
    if (!Array.isArray(items) || items.length === 0) throw new Error("Cart is empty");

    return items.map((item, idx) => {
      const productData = item.attributes?.product?.data;
      if (!productData || !productData.id) throw new Error(`Invalid product at position ${idx + 1}`);

      const attributes = productData.attributes || {};
      let price = attributes.price;
      if (price === null || price === undefined) throw new Error(`Price missing for "${attributes.name}"`);
      if (typeof price === "object") price = price.amount ?? price.value ?? (() => { throw new Error(`Invalid price for "${attributes.name}"`); })();
      price = parseFloat(price);
      if (isNaN(price) || price <= 0) throw new Error(`Invalid price for "${attributes.name}"`);

      const quantity = parseInt(item.attributes?.quantity || 1);
      if (isNaN(quantity) || quantity < 1) throw new Error(`Invalid quantity for "${attributes.name}"`);

      const imageUrl = attributes.image?.data?.attributes?.url
        ? "http://localhost:1337" + attributes.image.data.attributes.url
        : null;

      return {
        id: productData.id,
        name: attributes.name || "Product",
        price,
        quantity,
        image: imageUrl,
      };
    });
  };

  const handleFormSubmit = async (values, actions) => {
    if (activeStep === 0) {
      if (values.shippingAddress.isSameAddress) {
        actions.setFieldValue("shippingAddress", { ...values.billingAddress, isSameAddress: true });
      }
      setActiveStep(1);
    } else if (activeStep === 1) {
      await placeOrder(values, actions);
    }
    actions.setTouched({});
  };

  const placeOrder = async (values, actions) => {
    if (!cartItems.length) return alert("Cart is empty!");

    setLoading(true);
    setError(null);

    try {
      const products = mapProductsForOrder(cartItems);

      const payload = {
        userName: `${values.billingAddress.firstName} ${values.billingAddress.lastName}`,
        email: values.email,
        phone: values.phoneNumber,
        billingAddress: values.billingAddress,
        shippingAddress: values.shippingAddress.isSameAddress ? values.billingAddress : values.shippingAddress,
        products: products.map((p) => ({ id: p.id, count: p.quantity, price: p.price, image: p.image })),
        totalPrice: parseFloat(totalPrice.toFixed(2)),
      };

      const res = await fetch("http://localhost:1337/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: payload }),
      });

      const data = await res.json();

      if (!res.ok) {
        setValidProducts(data.error?.validProducts || []);
        throw new Error(data.error?.message || "Failed to place order");
      }

      setOrderData(data);
      setValidProducts(products);
      actions.resetForm();
      setActiveStep(0);

      // Stripe redirect if available
      const stripeSessionId = data.stripeSessionId || data.data?.attributes?.stripeSessionId;
      if (stripeSessionId) {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: stripeSessionId });
        if (stripeError) setError(stripeError.message);
      } else {
        alert("Order placed successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error("Place Order Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box width="90%" maxWidth="800px" m="50px auto" pt="50px">
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label, idx) => (
          <Step key={idx}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <Formik initialValues={initialValues} validationSchema={checkoutSchema[activeStep]} onSubmit={handleFormSubmit}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            {activeStep === 0 && <Shipping {...{ values, errors, touched, handleBlur, handleChange, setFieldValue }} />}
            {activeStep === 1 && <Payment {...{ values, errors, touched, handleBlur, handleChange, setFieldValue }} />}

            <Box display="flex" justifyContent="space-between" mt={3} flexWrap="wrap" gap={2}>
              {activeStep !== 0 && <Button variant="contained" color="secondary" onClick={() => setActiveStep(activeStep - 1)} disabled={loading}>Back</Button>}
              <Button type="submit" variant="contained" disabled={loading}>
                {loading && <CircularProgress size={20} sx={{ mr: 1 }} />}
                {activeStep === 1 ? "Place Order" : "Next"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {orderData && (
        <Box mt={5} p={3} border="1px solid #ccc" borderRadius={2}>
          <Typography variant="h5" mb={2} fontWeight="bold">Order Placed Successfully!</Typography>
          <Typography mb={1}><strong>Order ID:</strong> {orderData.data?.id || "N/A"}</Typography>
          <Typography mb={3}><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</Typography>

          <Typography variant="h6" mb={2} fontWeight="bold">Products:</Typography>
          <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(180px, 1fr))" gap={2}>
            {validProducts.map((p, idx) => (
              <Box key={idx} border="1px solid #eee" borderRadius={2} overflow="hidden" boxShadow="0 2px 8px rgba(0,0,0,0.05)" display="flex" flexDirection="column" alignItems="center" p={2}>
                {p.image ? (
                  <img src={p.image} alt={p.name} style={{ width: "100%", height: 180, objectFit: "cover", marginBottom: 8 }} />
                ) : (
                  <Box width="100%" height={180} bgcolor="#f0f0f0" mb={1} />
                )}
                <Typography fontWeight={600} textAlign="center" mb={1}>{p.name}</Typography>
                <Typography variant="body2" color="textSecondary" mb={1}>Qty: {p.quantity}</Typography>
                <Typography fontWeight={500}>${p.price.toFixed(2)}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {onBack && <Button variant="outlined" sx={{ mt: 3 }} onClick={onBack}>Back to Cart</Button>}
    </Box>
  );
};

export default Checkout;
