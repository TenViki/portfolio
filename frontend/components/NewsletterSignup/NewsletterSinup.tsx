"use client";

import React from "react";
import styles from "./NewsletterSignup.module.scss";
import TextField from "components/Input/TextField";
import Dropdown from "components/Input/Dropdown";
import { useMutation } from "react-query";
import { subscribe } from "api/newsletter";

const NewsletterSinup = () => {
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [language, setLanguage] = React.useState<string>("en");

  const [status, setStatus] = React.useState<string>();

  const subscribeMutation = useMutation(subscribe);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !name || !language) {
      setStatus("Please fill all the fields.");

      setTimeout(() => {
        setStatus(undefined);
      }, 3000);
      return;
    }

    subscribeMutation.mutate(
      {
        email,
        name,
        language,
      },
      {
        onSuccess: () => {
          setStatus("Success! Check your email for confirmation.");

          setTimeout(() => {
            setStatus(undefined);
          }, 3000);
        },
      }
    );
  };

  return (
    <div className={styles.newsletter + " container"} id="newsletter">
      <div className={styles.newsletter_text}>
        <h2>Join my newsletter!</h2>
        <p>
          I will send you an email when I post something new. If you want to
          know more about me, get some insights into my work or just want to
          stay up to date, feel free to subscribe to my newsletter.
        </p>

        <p>I promise I will not spam you.</p>
      </div>

      <div className={styles.newsletter_signup}>
        <form onSubmit={handleSubmit}>
          <TextField
            value={name}
            setValue={setName}
            label="What's your name?"
            placeholder="Write your name here"
          />

          <div className={styles.input_group}>
            <TextField
              value={email}
              setValue={setEmail}
              label="Where can I send the emails?"
              placeholder="Write your e-mail address here."
              error={(subscribeMutation.error as Error)?.message}
            />

            <Dropdown
              current={language}
              label="Preffered language?"
              onChange={setLanguage}
              options={[
                { id: "en", value: "English" },
                { id: "cs", value: "Czech" },
              ]}
            />
          </div>

          <button type="submit">{status ? status : "Subscribe"}</button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSinup;
