import { ActionIcon, ColorInput, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { deleteTag, updateTag } from "api/tags";
import React from "react";
import { FiAlertTriangle, FiEdit, FiTrash } from "react-icons/fi";
import { useMutation } from "react-query";
import { flatUiColors } from "./TagManager";

interface TagProps {
  id: string;
  name: string;
  color: string;

  triggerRefetch: () => void;
}

const Tag: React.FC<TagProps> = ({ id, color, name, triggerRefetch }) => {
  const [confirmDeletion, setConfirmDeletion] = React.useState<boolean>(false);

  const form = useForm({
    initialValues: {
      name,
      color,
    },
  });

  const deleteMutation = useMutation(deleteTag, {
    onSuccess: () => {
      notifications.show({
        message: "Tag byl úspěšně smazán",
        color: "green",
      });

      triggerRefetch();
    },
  });

  const updateMutation = useMutation(updateTag, {
    onSuccess: () => {
      notifications.show({
        message: "Tag byl úspěšně upraven",
        color: "green",
      });

      triggerRefetch();
    },
  });

  return (
    <Group mb={16}>
      <TextInput
        style={{
          flexGrow: 1,
        }}
        {...form.getInputProps("name")}
      />
      <ColorInput swatches={flatUiColors} {...form.getInputProps("color")} />
      <ActionIcon
        size={"lg"}
        variant="default"
        style={{
          transition: "all 0.3s ease",
        }}
        disabled={form.values.name === name && form.values.color === color}
        onClick={() => {
          updateMutation.mutate({
            id,
            name: form.values.name,
            color: form.values.color,
          });
        }}
      >
        <FiEdit />
      </ActionIcon>

      <ActionIcon
        color="red"
        size={"lg"}
        style={{
          transition: "all 0.3s ease",
        }}
        variant={confirmDeletion ? "filled" : "outline"}
        onClick={() => {
          if (!confirmDeletion) {
            setConfirmDeletion(true);
            setTimeout(() => {
              setConfirmDeletion(false);
            }, 3000);
          } else {
            deleteMutation.mutate(id);
          }
        }}
        disabled={deleteMutation.isLoading}
      >
        {confirmDeletion ? <FiAlertTriangle /> : <FiTrash />}
      </ActionIcon>
    </Group>
  );
};

export default Tag;
