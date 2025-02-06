const cohortName = "2412-FTB-ET-WEB-FT";
const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api`;

const checkinBooks = async (bookId, token) => {
  if (!token) {
    console.error("Authorization token is missing");
    return;
  }
  try {
    const response = await fetch(`${API_URL}/reservations/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};

export { checkinBooks };
