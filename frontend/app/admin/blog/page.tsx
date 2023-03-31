"use client";

import React from "react";
import { Button, Group, Text, Title } from "@mantine/core";
import styles from "./blog.module.scss";
import { FiPlus } from "react-icons/fi";
import { DataTable } from "mantine-datatable";
import { useDisclosure } from "@mantine/hooks";
import TagManager from "../../../components/admin/blog/TagManager/TagManager";
import CreatePost from "../../../components/admin/blog/CreatePost";

const BlogAdminPage = () => {
  const [createOpened, { open, close: closeCreate }] = useDisclosure(false);
  const [tagsOpened, { open: openTags, close: closeTags }] =
    useDisclosure(false);

  return (
    <div>
      <Group className="">
        <Title
          style={{
            flexGrow: 1,
          }}
        >
          Blog
        </Title>

        <Button color="gray" onClick={openTags}>
          Správa tagů
        </Button>

        <Button leftIcon={<FiPlus />} color="blue" onClick={open}>
          Vytvořit příspěvek
        </Button>
      </Group>

      {/* <DataTable></DataTable> */}

      <CreatePost close={closeCreate} opened={createOpened} />
      <TagManager close={closeTags} opened={tagsOpened} />
    </div>
  );
};

export default BlogAdminPage;
