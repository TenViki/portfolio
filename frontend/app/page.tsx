import React from "react";
import Hero from "../components/sections/hero/Hero";
import AboutMe from "../components/sections/aboutme/AboutMe";
import GoogleLogin from "../components/GoogleLogin/GoogleLogin";
import UserProfile from "../components/User/UserProfile";

const MainPage = () => {
  return (
    <div className="app">
      <Hero />

      <div className="background">
        <AboutMe />
        <div style={{ height: "100vh" }}>
          <div id="google-login">
            <GoogleLogin />
          </div>
          Current user state: <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
