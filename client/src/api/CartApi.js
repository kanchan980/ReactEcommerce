
export const getCartItems = async () => {
  try {
    const response = await fetch("http://localhost:1337/api/carts?populate[product][populate]=image", {
      headers: {
        "Content-Type": "application/json",
        // Add Authorization if needed:
        // "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) throw new Error("Failed to fetch cart items");

    const data = await response.json();
    return data.data; 
  } catch (err) {
    console.error(err);
    return [];
  }
};
