import React from "react";
import Hero from "../components/sections/hero/Hero";
import AboutMe from "../components/sections/aboutme/AboutMe";
import GoogleLogin from "../components/GoogleLogin/GoogleLogin";
import UserProfile from "../components/User/UserProfile";
import NewsletterSinup from "components/NewsletterSignup/NewsletterSinup";

const MainPage = () => {
  return (
    <div className="app">
      <Hero />

      <div className="background">
        <AboutMe />
        <NewsletterSinup />
      </div>
    </div>
  );
};

export default MainPage;
