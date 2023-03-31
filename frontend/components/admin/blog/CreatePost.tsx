import React, { FC } from "react";
import { Button, FileInput, Group, Modal, TextInput } from "@mantine/core";
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

interface CreatePostProps {
  close: () => void;
  opened: boolean;
}

const CreatePost: FC<CreatePostProps> = ({ close, opened }) => {
  const form = useForm({
    initialValues: {
      title: "",
      slug: "",
      banner: undefined,
    },

    validate: {
      slug: (value: string) =>
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? null : "Neplatný slug",
    },
  });

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

  return (
    <Modal
      opened={opened}
      onClose={close}
      size={"xl"}
      title="Přidat příspěvek na blog"
      closeOnClickOutside={false}
    >
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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

        <FileInput
          label="Baner článku"
          placeholder="Kliknutím vyberete baner článku"
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
          </div>
        )}

        <RichTextEditor editor={editor}>
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
      </form>

      <Group mt="xl" position="right">
        <Button variant="outline" color="gray" onClick={close}>
          Zavřít
        </Button>
        <Button color="blue">Vytvořit příspěvek</Button>
      </Group>
    </Modal>
  );
};

export default CreatePost;
