import React, { FC } from "react";
import {
  ActionIcon,
  Avatar,
  Button,
  Checkbox,
  FileInput,
  Group,
  LoadingOverlay,
  Modal,
  MultiSelect,
  Text,
  TextInput,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";

import { useForm } from "@mantine/form";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";

import styles from "./CreatePost.module.scss";
import { useMutation, useQuery } from "react-query";
import { getTags } from "api/tags";
import { FiX } from "react-icons/fi";
import { SelectItem, Value } from "./SelectItem";
import { uploadFile } from "api/files";
import { newBlogPost } from "api/blog";
import { notifications } from "@mantine/notifications";

interface CreatePostProps {
  close: () => void;
  opened: boolean;
}

interface FormValues {
  title: string;
  slug: string;
  banner: File | undefined;
  tags: string[];
  published: boolean;
}

const CreatePost: FC<CreatePostProps> = ({ close, opened }) => {
  const form = useForm({
    initialValues: {
      title: "",
      slug: "",
      banner: undefined,
      tags: [],
      published: false,
    },

    validate: {
      slug: (value: string) =>
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? null : "Neplatný slug",
      tags: (value: string[]) =>
        value.length > 0 ? null : "Musíte vybrat alespoň jeden tag",
    },
  });

  const tagsQuery = useQuery("tags", getTags);
  const newBlogPostMutation = useMutation(newBlogPost, {
    onError: () => {
      notifications.show({ message: "Ukládání příspěvku selhalo" });
      setStatus("");
    },
  });

  const [status, setStatus] = React.useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("title", e.target.value);

    // format slug
    let slug = e.target.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s\s+/g, " ")
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    form.setFieldValue("slug", slug);
  };

  const handleSubmit = async (values: FormValues) => {
    console.log(values);

    if (!editor)
      return notifications.show({ message: "Editor není připravený" });

    let fileId = undefined;

    if (values.banner) {
      // uplaod image to server

      try {
        setStatus("Nahrávání obrázku...");
        const response = await uploadFile(values.banner);
        fileId = response.data.id;
      } catch (error) {
        console.error(error);
        notifications.show({ message: "Nahrávání obrázku selhalo" });
        setStatus("");
        return;
      }
    }

    setStatus("Ukládání příspěvku...");
    // save post to server
    await newBlogPostMutation.mutateAsync({
      title: values.title,
      slug: values.slug,
      bannerImageId: fileId,
      tags: values.tags,
      content: editor!.getHTML(),
      published: values.published,
    });

    setStatus("");
    close();
    notifications.show({ message: "Příspěvek byl úspěšně vytvořen" });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      size={"xl"}
      title="Přidat příspěvek na blog"
      closeOnClickOutside={false}
    >
      <LoadingOverlay visible={status !== ""} />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Název příspěvku"
          placeholder="Název příspěvku"
          required
          mb={16}
          {...form.getInputProps("title")}
          onChange={handleTitleChange}
        />

        <TextInput
          label="Slug"
          placeholder="Slug"
          required
          mb={16}
          {...form.getInputProps("slug")}
        />

        {tagsQuery.isLoading || !tagsQuery.data ? (
          <Text align="center" color="dimmed">
            Načítání tagů...
          </Text>
        ) : (
          <MultiSelect
            label="Tagy"
            placeholder="Vyberte tagy"
            required
            itemComponent={SelectItem}
            valueComponent={Value}
            transitionProps={{
              duration: 150,
              timingFunction: "ease",
            }}
            mb={16}
            data={tagsQuery.data?.map((tag) => ({
              label: tag.name,
              value: tag.id,
              color: tag.color,
            }))}
            {...form.getInputProps("tags")}
          />
        )}

        <FileInput
          label="Baner příspěvku"
          placeholder="Kliknutím vyberete baner příspěvku"
          required
          accept="image/png, image/jpeg"
          mb={16}
          {...form.getInputProps("banner")}
        />

        {/* Preview banner image */}
        {form.values.banner && (
          <div className={styles.banner}>
            <img
              src={URL.createObjectURL(form.values.banner)}
              alt="Banner"
              style={{ width: "100%" }}
            />

            <ActionIcon
              variant="filled"
              size="sm"
              onClick={() => form.setFieldValue("banner", undefined)}
              color="red"
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                zIndex: 1,
              }}
            >
              <FiX />
            </ActionIcon>
          </div>
        )}

        <RichTextEditor editor={editor} mb={16} mih={200}>
          <RichTextEditor.Toolbar>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor>

        <Checkbox
          label="Zveřejnit hned po uložení"
          {...form.getInputProps("published", { type: "checkbox" })}
        />

        <Group mt="xl" position="right">
          <Button variant="outline" color="gray" onClick={close}>
            Zavřít
          </Button>
          <Button color="blue" type="submit" disabled={!!status}>
            {status || "Vytvořit příspěvek"}
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default CreatePost;
