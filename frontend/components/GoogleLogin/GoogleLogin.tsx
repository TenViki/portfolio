"use client";

import { PromptMomentNotification } from "google-one-tap";
import React from "react";

const GoogleLogin = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    window.google?.accounts.id.renderButton(ref.current, {
      theme: "outline",
      size: "large",
      text: "continue_with",
      shape: "circle",
      width: 250,
      logo_alignment: "left",
    });
  }, [ref]);

  return <div ref={ref}></div>;
};

export default GoogleLogin;
