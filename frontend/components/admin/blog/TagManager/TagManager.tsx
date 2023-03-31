import React, { FC } from "react";
import {
  Button,
  ColorInput,
  Group,
  LoadingOverlay,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useMutation, useQuery } from "react-query";
import { createTag, getTags } from "api/tags";
import Tag from "./Tag";

interface TagManagerProps {
  close: () => void;
  opened: boolean;
}

const TagManager: FC<TagManagerProps> = ({ close, opened }) => {
  const { data, refetch } = useQuery("tags", getTags);

  const [newTag, setNewTag] = React.useState<string>("");
  const [newTagColor, setNewTagColor] = React.useState<string>("");

  const createTagMutation = useMutation(createTag, {
    onSuccess: () => {
      setNewTag("");
      setNewTagColor("");

      refetch();
    },
  });

  return (
    <Modal
      opened={opened}
      onClose={close}
      size={"lg"}
      title="Správa tagů"
      closeOnClickOutside={false}
    >
      <LoadingOverlay
        visible={createTagMutation.isLoading}
        overlayBlur={8}
        transitionDuration={300}
      />

      {data?.map((tag) => (
        <Tag {...tag} key={tag.id} />
      ))}

      {data?.length === 0 && (
        <Text size={"sm"} color="dimmed" align="center" mb={16}>
          Žádné tagy
        </Text>
      )}

      <div style={{ borderBottom: "1px solid #444", marginBottom: 16 }}></div>

      <Group align="flex-end">
        <TextInput
          label="Název tagu"
          placeholder="Název tagu"
          required
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          style={{
            flexGrow: 1,
          }}
        />

        <ColorInput
          label="Barva tagu"
          placeholder="Vyberte barvu tagu"
          required
          swatches={[
            "#16a085",
            "#1abc9c",
            "#27ae60",
            "#2ecc71",
            "#3498db",
            "#2980b9",
            "#9b59b6",
            "#8e44ad",
            "#f1c40f",
            "#f39c12",
            "#e67e22",
            "#d35400",
            "#e74c3c",
            "#c0392b",
          ]}
          value={newTagColor}
          onChange={setNewTagColor}
        />

        <Button
          color="blue"
          variant="outline"
          onClick={() => {
            createTagMutation.mutate({
              name: newTag,
              color: newTagColor,
            });
          }}
        >
          Přidat tag
        </Button>
      </Group>
    </Modal>
  );
};

export default TagManager;
