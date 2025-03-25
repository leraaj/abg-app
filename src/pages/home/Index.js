import React from "react";
import "./home.css";
import Navbar from "../../components/layouts/navigation/Index";
const Index = () => {
  return (
    <div className="home-container">
      <Navbar />
      <section className="content-container">Home</section>
    </div>
  );
};

export default Index;
