"use client";

import React, { useEffect, useState } from "react";
import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import styles from "./blog.module.scss";
import { FiEdit2, FiPlus, FiSearch, FiTrash } from "react-icons/fi";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import TagManager from "../../../components/admin/blog/TagManager/TagManager";
import CreatePost from "../../../components/admin/blog/CreatePost";
import { useQuery } from "react-query";
import { getAllBlogPostsAdmin } from "api/blog";
import TagTable from "components/admin/blog/TagTable";
import { BlogPost } from "types/blog";
import { sortBy } from "lodash";

const BlogAdminPage = () => {
  const [createOpened, { open, close: closeCreate }] = useDisclosure(false);
  const [tagsOpened, { open: openTags, close: closeTags }] =
    useDisclosure(false);

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "createdAt",
    direction: "desc",
  });
  const [records, setRecords] = useState<BlogPost[]>([]);

  const blogPostsQuery = useQuery("blogPostsAdmin", getAllBlogPostsAdmin, {
    onSuccess: (data) => {
      const d = sortBy(data, sortStatus.columnAccessor) as BlogPost[];
      setRecords(sortStatus.direction === "desc" ? d.reverse() : d);
    },
  });

  useEffect(() => {
    const data = sortBy(
      blogPostsQuery.data,
      sortStatus.columnAccessor
    ) as BlogPost[];
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus]);

  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);

  const [creationStatus, setCreationStatus] = useState<"create" | "edit">(
    "create"
  );
  const [editRecord, setEditRecord] = useState<BlogPost>();

  return (
    <div>
      <Group mb={16}>
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

        <Button
          leftIcon={<FiPlus />}
          color="blue"
          onClick={() => {
            setCreationStatus("create");
            setEditRecord(undefined);
            open();
          }}
        >
          Vytvořit příspěvek
        </Button>
      </Group>

      <Group mb={16} grow>
        <TextInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon={<FiSearch />}
          placeholder="Hledat..."
          width={"100%"}
        />
      </Group>

      <DataTable
        withBorder
        borderRadius="sm"
        withColumnBorders
        striped
        minHeight={150}
        highlightOnHover
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        columns={[
          {
            accessor: "title",
            title: "Název",
            sortable: true,
          },
          {
            accessor: "published",
            title: "Publikováno",
            render: (record) => <Text>{record.published ? "Ano" : "Ne"}</Text>,
            sortable: true,
          },
          {
            accessor: "tags",
            title: "Tagy",
            render: (record) => (
              <Group spacing={8}>
                {record.tags.map((tag) => (
                  <TagTable color={tag.color} value={tag.name} key={tag.id} />
                ))}
              </Group>
            ),
            sortable: true,
          },
          {
            accessor: "createdAt",
            title: "Vytvořeno",
            render: (record) => (
              <Text>
                {new Date(record.createdAt).toLocaleDateString("cs-CZ")} v{" "}
                {new Date(record.createdAt).toLocaleTimeString("cs-CZ")}
              </Text>
            ),
            sortable: true,
          },
          {
            accessor: "updatedAt",
            title: "Upraveno",
            render: (record) => (
              <Text>
                {new Date(record.updatedAt).toLocaleDateString("cs-CZ")} v{" "}
                {new Date(record.updatedAt).toLocaleTimeString("cs-CZ")}
              </Text>
            ),
            sortable: true,
          },
          {
            accessor: "author",
            title: "Autor",
            render: (record) => (
              <Group spacing={8}>
                <Avatar src={record.author.picture} size={24} radius={24} />
                <Text>{record.author.name}</Text>
              </Group>
            ),
            sortable: true,
          },
          // a column for actions
          {
            title: "Akce",
            accessor: "",
            width: "0%",
            render: (record) => (
              <Group spacing={8} noWrap>
                <ActionIcon
                  variant="default"
                  onClick={() => {
                    setCreationStatus("edit");
                    setEditRecord(record);
                    open();
                  }}
                >
                  <FiEdit2 />
                </ActionIcon>

                <ActionIcon variant="filled" color="red">
                  <FiTrash />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={records.filter((record) => {
          if (!debouncedQuery) return true;

          return (
            record.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            record.tags
              .map((tag) => tag.name.toLowerCase())
              .join(" ")
              .includes(debouncedQuery.toLowerCase())
          );
        })}
      />

      <CreatePost
        close={closeCreate}
        opened={createOpened}
        mode={creationStatus}
        editRecord={editRecord}
      />
      <TagManager close={closeTags} opened={tagsOpened} />
    </div>
  );
};

export default BlogAdminPage;
