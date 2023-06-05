"use client";

import {
  Alert,
  Button,
  Group,
  Input,
  MantineProvider,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { getPreferences } from "api/newsletter";
import { getTags } from "api/tags";
import React, { FC } from "react";
import { useQuery } from "react-query";

interface PreferencesFormProps {
  id: string;
}

const PreferencesForm: FC<PreferencesFormProps> = ({ id }) => {
  const tagsQuery = useQuery("tags", getTags);
  console.log(id);
  const [name, setName] = React.useState<string>("");
  const preferencesQuery = useQuery("preferences", () => getPreferences(id), {
    enabled: !!id,
    onSuccess: (data) => {
      setName(data.name);
      setPreferences(data.preferences.map((t) => t.id));
    },
  });

  const [preferences, setPreferences] = React.useState<string[]>([]);

  if (tagsQuery.isLoading || preferencesQuery.isLoading || !tagsQuery.data) {
    return <div>Loading...</div>;
  }

  if (tagsQuery.isError || preferencesQuery.isError) {
    return <div>Could not fetch preferences</div>;
  }

  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      {preferencesQuery.data?.hasConfirmed && (
        <Alert color="green" title="E-mail confirmed!" mt={16}>
          Your e-mail has been confirmed. You can now manage your newsletter
          preferences.
        </Alert>
      )}
      <Title mb={16} mt={16}>
        Newsletter Preferences
      </Title>
      <Group mb={16}>
        <Text>Your name:</Text>
        <Input
          style={{ flexGrow: 1 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Group>
      <Text>You are currently subscribed to the following tags:</Text>
      <div style={{ marginBottom: 16 }}>
        {tagsQuery.data.map((tag) => (
          <Group key={tag.id}>
            <Text style={{ flexGrow: 1 }}>{tag.name}</Text>
            <Switch
              checked={preferences.includes(tag.id)}
              onChange={(value) => {
                if (value.currentTarget.checked) {
                  setPreferences([...preferences, tag.id]);
                } else {
                  setPreferences(
                    preferences.filter((preference) => preference !== tag.id)
                  );
                }
              }}
            />
          </Group>
        ))}
      </div>

      <Button style={{ margin: "0 auto", justifySelf: "center" }}>
        {preferencesQuery.data ? "Update Preferences" : "Save Preferences"}
      </Button>
    </MantineProvider>
  );
};

export default PreferencesForm;
