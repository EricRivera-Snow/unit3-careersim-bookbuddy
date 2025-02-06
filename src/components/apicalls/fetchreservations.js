const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api`;

const fetchReservations = async (token) => {
  try {
    console.log("🔍 Fetching Reservations with Token:", token);

    const response = await fetch(`${API_URL}/reservations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    console.log("📥 Parsed JSON Response:", json);

    if (json && json.reservation && Array.isArray(json.reservation)) {
      console.log("✅ Extracted Reservations Array:", json.reservation);
      return json.reservation; // ✅ Return correct array
    }

    console.error("❌ API did not return an array:", json);
    return []; // ✅ Prevent `.map()` errors
  } catch (err) {
    console.error("❌ Error Fetching Reservations:", err);
    return []; // ✅ Prevent `.map()` errors
  }
};

export { fetchReservations };
