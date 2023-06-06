"use client";

import { getPreferences, unsubscribe, updatePreferences } from "api/newsletter";
import { getTags } from "api/tags";
import React, { FC } from "react";
import { useMutation, useQuery } from "react-query";
import styles from "./PreferenceForm.module.scss";
import TextField from "components/Input/TextField";
import Dropdown from "components/Input/Dropdown";
import TagSwitch from "./TagSwitch";
import { useRouter } from "next/navigation";

interface PreferencesFormProps {
  id: string;
}

const PreferencesForm: FC<PreferencesFormProps> = ({ id }) => {
  const [name, setName] = React.useState<string>("");
  const [preferences, setPreferences] = React.useState<string[]>([]);
  const [language, setLanguage] = React.useState<string>("en");

  const [state, setState] = React.useState("idle");

  const router = useRouter();

  const updatePreferencesMutation = useMutation(updatePreferences);

  const tagsQuery = useQuery("tags", getTags);
  const preferencesQuery = useQuery("preferences", () => getPreferences(id), {
    enabled: !!id,
    onSuccess: (data) => {
      setName(data.name);
      setPreferences(data.preferences.map((t) => t.id));
      setLanguage(data.language);
    },
    refetchOnWindowFocus: false,
  });

  if (tagsQuery.isLoading || preferencesQuery.isLoading || !tagsQuery.data) {
    return <div>Loading...</div>;
  }

  if (tagsQuery.isError || preferencesQuery.isError) {
    return <div>Could not fetch preferences</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setState("loading");

    updatePreferencesMutation.mutate(
      {
        id,
        name,
        language,
        preferences,
      },
      {
        onSuccess: () => {
          setState("success");

          setTimeout(() => {
            setState("idle");
          }, 2000);
        },
      }
    );
  };

  const handleUnsubscribe = async () => {
    await unsubscribe(id);

    router.push("/newsletter/unsubscribe");
  };

  return (
    <form className={styles.preferences} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Newsletter Preferences</h1>

      {preferencesQuery.data?.hasConfirmed && (
        <div className={styles.alert}>
          <h2 className={styles.alertTitle}>E-mail confirmed!</h2>
          <p className={styles.alertText}>
            Your e-mail has been confirmed. You can now manage your newsletter
            preferences.
          </p>
        </div>
      )}

      <TextField label="Your name" value={name} setValue={setName} />

      <Dropdown
        label="Preffered language"
        current={language}
        onChange={setLanguage}
        options={[
          { id: "en", value: "English" },
          { id: "cs", value: "Czech" },
        ]}
      />

      <div className={styles.preferencesTags}>
        <h2 className={styles.preferencesTitle}>
          Currently subscribed to the following tags:
        </h2>

        <div className={styles.preferencesList}>
          {tagsQuery.data.map((tag) => (
            <TagSwitch
              color={tag.color}
              label={tag.name}
              state={preferences.includes(tag.id)}
              setState={(state) => {
                if (state) {
                  setPreferences([...preferences, tag.id]);
                } else {
                  setPreferences(
                    preferences.filter((preference) => preference !== tag.id)
                  );
                }
              }}
            />
          ))}
        </div>
      </div>

      <button
        className={styles.button}
        disabled={updatePreferencesMutation.isLoading}
      >
        {updatePreferencesMutation.isLoading
          ? "Loading..."
          : state === "success"
          ? "Saved!"
          : "Save preferences"}
      </button>

      <div className={styles.footer} onClick={handleUnsubscribe}>
        Unsubscribe from all e-mails
      </div>
    </form>
  );
};

export default PreferencesForm;
