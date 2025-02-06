const cohortName = "2412-FTB-ET-WEB-FT";
const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api`;

const checkoutBook = async (bookId, token) => {
  try {
    console.log(`🔍 Checking out book ID: ${bookId}`);

    const response = await fetch(`${API_URL}/books/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ available: false }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const json = await response.json();
    console.log("API Response:", json);

    return json;
  } catch (err) {
    console.error("Checkout API Error:", err);
    return null;
  }
};

export { checkoutBook };
