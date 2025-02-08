import React from "react";
import library from "../assets/pexels-ivo-rainha-527110-1290141.jpg"; // Ensure this path is correct
import "../assets/styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <img src={library} alt="Library" className="home-image" />
      <div className="home-overlay">
        <h2>Welcome to Eric's Public Library</h2>
        <p>Discover, Read, and Explore a World of Knowledge.</p>
      </div>
    </div>
  );
}

export default Home;
