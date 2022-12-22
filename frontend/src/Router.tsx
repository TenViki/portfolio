import React from "react";
import { Route, Routes } from "react-router";
import App from "./MainPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  );
};

export default Router;
