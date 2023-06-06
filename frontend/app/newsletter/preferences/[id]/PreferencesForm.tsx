"use client";

import { getPreferences } from "api/newsletter";
import { getTags } from "api/tags";
import React, { FC } from "react";
import { useQuery } from "react-query";
import styles from "./PreferenceForm.module.scss";
import TextField from "components/Input/TextField";
import Dropdown from "components/Input/Dropdown";
import TagSwitch from "./TagSwitch";

interface PreferencesFormProps {
  id: string;
}

const PreferencesForm: FC<PreferencesFormProps> = ({ id }) => {
  const [name, setName] = React.useState<string>("");
  const [preferences, setPreferences] = React.useState<string[]>([]);
  const [language, setLanguage] = React.useState<string>("en");

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

      <button className={styles.button}>Save Preferences</button>
    </form>
    //   <MantineProvider theme={{ colorScheme: "dark" }}>
    //     {preferencesQuery.data?.hasConfirmed && (
    //       <Alert color="green" title="E-mail confirmed!" mt={16}>
    //         Your e-mail has been confirmed. You can now manage your newsletter
    //         preferences.
    //       </Alert>
    //     )}
    //     <Title mb={16} mt={16}>
    //       Newsletter Preferences
    //     </Title>
    //     <Group mb={16}>
    //       <Text>Your name:</Text>
    //       <Input
    //         style={{ flexGrow: 1 }}
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       />
    //     </Group>
    //     <Text>You are currently subscribed to the following tags:</Text>
    //     <div style={{ marginBottom: 16 }}>
    //       {tagsQuery.data.map((tag) => (
    //         <Group key={tag.id}>
    //           <Text style={{ flexGrow: 1 }}>{tag.name}</Text>
    //           <Switch
    //             checked={preferences.includes(tag.id)}
    //             onChange={(value) => {
    //               if (value.currentTarget.checked) {
    //                 setPreferences([...preferences, tag.id]);
    //               } else {
    //                 setPreferences(
    //                   preferences.filter((preference) => preference !== tag.id)
    //                 );
    //               }
    //             }}
    //           />
    //         </Group>
    //       ))}
    //     </div>

    //     <Button style={{ margin: "0 auto", justifySelf: "center" }}>
    //       {preferencesQuery.data ? "Update Preferences" : "Save Preferences"}
    //     </Button>
    //   </MantineProvider>
  );
};

export default PreferencesForm;
