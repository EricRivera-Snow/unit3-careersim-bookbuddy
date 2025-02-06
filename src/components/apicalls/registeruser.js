const cohortName = "2412-FTB-ET-WEB-FT";
const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api`;

const registerUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("HTTP Error! Status: " + response.status);
    }

    const json = await response.json();
    console.log("Registration response: ", json);
    return json;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export { registerUser };
