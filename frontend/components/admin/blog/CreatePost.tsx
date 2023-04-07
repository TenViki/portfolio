import {
  ActionIcon,
  Button,
  Checkbox,
  FileInput,
  Group,
  LoadingOverlay,
  Modal,
  MultiSelect,
  ScrollArea,
  Text,
  TextInput,
} from "@mantine/core";
import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import React, { FC, useEffect } from "react";

import { useForm } from "@mantine/form";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import ImageExtension from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";

import { notifications } from "@mantine/notifications";
import { editBlogPost, newBlogPost } from "api/blog";
import { uploadFile } from "api/files";
import { getTags } from "api/tags";
import { FiCode, FiX } from "react-icons/fi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BlogPost } from "types/blog";
import { getFileUrl } from "utils/files";
import styles from "./CreatePost.module.scss";
import { SelectItem, Value } from "./SelectItem";
import { KatexExtension } from "utils/KatexExtension";

import { TbMathFunction } from "react-icons/tb";

interface CreatePostProps {
  close: () => void;
  opened: boolean;

  mode: "create" | "edit";
  editRecord?: BlogPost;
}

interface FormValues {
  title: string;
  slug: string;
  banner: File | undefined;
  tags: string[];
  published: boolean;
}

export const InsertKatexBlock = () => {
  const { editor } = useRichTextEditorContext();

  return (
    <RichTextEditor.Control
      onClick={() => {
        editor?.commands.toggleKatexBlock();
      }}
      active={editor?.isActive("katexBlock")}
    >
      <TbMathFunction />
    </RichTextEditor.Control>
  );
};

const CreatePost: FC<CreatePostProps> = ({
  close,
  opened,
  mode,
  editRecord,
}) => {
  const form = useForm<FormValues>({
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

  const queryClient = useQueryClient();

  useEffect(() => {
    if (mode === "edit" && editRecord) {
      form.setFieldValue("title", editRecord.title);
      form.setFieldValue("slug", editRecord.slug);
      form.setFieldValue(
        "tags",
        editRecord.tags.map((tag) => tag.id)
      );
      form.setFieldValue("published", editRecord.published);

      editor?.commands.setContent(JSON.parse(editRecord.content));
    } else {
      form.reset();
      editor?.commands.setContent("");
    }
  }, [mode, editRecord]);

  const tagsQuery = useQuery("tags", getTags);
  const newBlogPostMutation = useMutation(newBlogPost, {
    onError: () => {
      notifications.show({ message: "Ukládání příspěvku selhalo" });
      setStatus("");
    },
  });
  const updatePostMutation = useMutation(editBlogPost, {
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
      ImageExtension,
      KatexExtension,
      Code,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    editorProps: {
      handleDrop: function (view, event, slice, moved) {
        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files[0]
        ) {
          // if dropping external files
          let file = event.dataTransfer.files[0]; // the dropped file
          let filesize = (file.size / 1024 / 1024).toFixed(4); // get the filesize in MB
          if (
            (file.type === "image/jpeg" || file.type === "image/png") &&
            +filesize < 10
          ) {
            // check valid image type under 10MB
            // check the dimensions
            let _URL = window.URL || window.webkitURL;
            let img = new Image(); /* global Image */
            img.src = _URL.createObjectURL(file);
            img.onload = function () {
              // valid image so upload to server
              // uploadImage will be your function to upload the image to the server or s3 bucket somewhere

              uploadFile(file)
                .then((res) => {
                  const { schema } = view.state;
                  const coordinates = view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY,
                  });
                  const node = schema.nodes.image.create({
                    src: getFileUrl(res.data.id),
                  }); // creates the image element
                  const transaction = view.state.tr.insert(
                    coordinates!.pos,
                    node
                  ); // places it in the correct position
                  return view.dispatch(transaction);
                })
                .catch((err) => {
                  notifications.show({
                    title: "Nahrávání obrázku se nepovedlo",
                    message: "Podívejte se do konzole pro více informací",
                    color: "red",
                  });
                  console.error(err);
                });
            };
          } else {
            notifications.show({
              message:
                "Images need to be in jpg or png format and less than 10mb in size.",
            });
          }
          return true; // handled
        }
        return false; // not handled use default behaviour
      },
    },
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

    if (mode === "edit" && editRecord) {
      // update post on server
      await updatePostMutation.mutateAsync({
        id: editRecord.id,
        title: values.title,
        slug: values.slug,
        bannerImageId: fileId,
        tags: values.tags,
        content: JSON.stringify(editor!.getJSON()),
        published: values.published,
      });

      setStatus("");
      close();
      notifications.show({ message: "Příspěvek byl úspěšně upraven" });
      queryClient.invalidateQueries("blogPostsAdmin");
      form.reset();

      return;
    }

    // save post to server
    await newBlogPostMutation.mutateAsync({
      title: values.title,
      slug: values.slug,
      bannerImageId: fileId,
      tags: values.tags,
      content: JSON.stringify(editor!.getJSON()),
      published: values.published,
    });

    setStatus("");
    close();
    notifications.show({ message: "Příspěvek byl úspěšně vytvořen" });
    queryClient.invalidateQueries("blogPostsAdmin");
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      size={"xl"}
      title={mode === "edit" ? "Upravit příspěvek" : "Přidat příspěvek na blog"}
      closeOnClickOutside={false}
      scrollAreaComponent={ScrollArea.Autosize}
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
          placeholder={"Kliknutím vyberete baner příspěvku"}
          required
          accept="image/png, image/jpeg"
          mb={16}
          {...form.getInputProps("banner")}
        />

        {/* Preview banner image */}
        {(editRecord?.banner || form.values.banner) && (
          <div className={styles.banner}>
            <img
              src={
                form.values.banner
                  ? URL.createObjectURL(form.values.banner!)
                  : getFileUrl(editRecord!.banner!.id)
              }
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
          <RichTextEditor.Toolbar sticky stickyOffset={48}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Code icon={FiCode} />
              <RichTextEditor.CodeBlock />
              <InsertKatexBlock />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
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
          label={
            mode === "edit" ? "Veřejný příspěvek" : "Zveřejnit hned po uložení"
          }
          {...form.getInputProps("published", { type: "checkbox" })}
        />

        <Group mt="xl" position="right">
          <Button variant="outline" color="gray" onClick={close}>
            Zavřít
          </Button>
          <Button color="blue" type="submit" disabled={!!status}>
            {status || mode === "edit"
              ? "Uložit příspěvek"
              : "Vytvořit příspěvek"}
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default CreatePost;
