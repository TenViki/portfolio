import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div
      className="container"
      style={{
        marginTop: "5rem",
        maxWidth: "30rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontWeight: 100,
          color: "#aaa",
          marginBottom: "1rem",
        }}
      >
        Successfully unsubsribed!
      </h1>
      <p style={{ marginBottom: "1rem" }}>
        You have been successfully unsubscribed from our newsletter.
      </p>

      <p>
        We are sorry to see you go. If you change your mind, you can always
        resubscribe by clicking <Link href="/#newsletter">here</Link>.
      </p>
    </div>
  );
};

export default page;
