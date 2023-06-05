import React from "react";
import PreferencesForm from "./PreferencesForm";

interface NewsleetterProps {
  params: {
    id: string;
  };
}

export const metadata = {
  title: "Newsletter Preferences",
};

const page = ({ params }: NewsleetterProps) => {
  return (
    <div className="container" style={{ maxWidth: "30rem" }}>
      <PreferencesForm id={params.id} />
    </div>
  );
};

export default page;
