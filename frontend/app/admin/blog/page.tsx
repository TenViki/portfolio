"use client";

import React from "react";
import { Button, Group, Text, Title } from "@mantine/core";
import styles from "./blog.module.scss";
import { FiPlus } from "react-icons/fi";
import { DataTable } from "mantine-datatable";
import { useDisclosure } from "@mantine/hooks";
import CreatePost from "../../../components/admin/blog/CreatePost";

const BlogAdminPage = () => {
  const [opened, { open, close }] = useDisclosure(false);

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

        <Button leftIcon={<FiPlus />} color="blue" onClick={open}>
          Vytvořit příspěvek
        </Button>
      </Group>

      {/* <DataTable></DataTable> */}

      <CreatePost close={close} opened={opened} />
    </div>
  );
};

export default BlogAdminPage;
