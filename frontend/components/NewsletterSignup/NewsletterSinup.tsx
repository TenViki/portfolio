"use client";

import React from "react";
import styles from "./NewsletterSignup.module.scss";
import TextField from "components/Input/TextField";
import Dropdown from "components/Input/Dropdown";

const NewsletterSinup = () => {
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [language, setLanguage] = React.useState<string>("en");

  const subscribeMutation = () => {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.newsletter + " container"}>
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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

          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSinup;
