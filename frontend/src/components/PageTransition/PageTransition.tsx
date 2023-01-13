import React from "react";
import { usePageTransition } from "../../utils/usePageTransition";
import "./PageTransition.scss";

const PageTransition = () => {
  const { transition } = usePageTransition();

  return (
    <div
      className={`page-transition ${transition.state} ${transition.side}`}
    ></div>
  );
};

export default PageTransition;
