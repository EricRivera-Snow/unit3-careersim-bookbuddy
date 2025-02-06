const cohortName = "2412-FTB-ET-WEB-FT";
const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api`;

const fetchSingleBook = async (bookId) => {
  try {
    const response = await fetch(`${API_URL}/books/${bookId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json.book;
  } catch (err) {
    console.error(err);
  }
};

export { fetchSingleBook };