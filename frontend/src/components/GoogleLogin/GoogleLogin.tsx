import { PromptMomentNotification } from "google-one-tap";
import React from "react";

const GoogleLogin = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const elementId = `google-login-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  const [promptDisplayed, setPromptDisplayed] = React.useState(true);

  const handlePromptEvent = (e: PromptMomentNotification) => {
    if (e.isNotDisplayed()) setPromptDisplayed(false);
    if (e.isSkippedMoment()) setPromptDisplayed(false);
  };

  React.useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: (res) => console.log(res),
      prompt_parent_id: elementId,
      auto_select: true,
    });

    window.google.accounts.id.prompt(handlePromptEvent);
  }, []);

  React.useEffect(() => {
    if (!ref.current) return;
    if (promptDisplayed) return;

    window.google.accounts.id.renderButton(ref.current, {
      theme: "outline",
      size: "large",
      text: "continue_with",
      shape: "circle",
      width: 250,
      logo_alignment: "left",
    });
  }, [ref, promptDisplayed]);

  return <div id={elementId} ref={ref}></div>;
};

export default GoogleLogin;
