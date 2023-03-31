import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Navbar,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { useUser } from "../../../utils/useUser";
import { FiBook, FiHome, FiLogOut, FiUsers } from "react-icons/fi";

import NavbarLink from "./NavbarLink";
import { useRouter } from "next/navigation";

const AdminNavbar = () => {
  const { user, setUser } = useUser();
  const router = useRouter();

  return (
    <Navbar p="sm" width={{ base: 300 }}>
      <Navbar.Section>
        <Text align="center" size={"xl"}>
          Administrace
        </Text>
      </Navbar.Section>

      <Navbar.Section grow mt="md">
        <NavbarLink href="/admin" text="Dashboard" icon={<FiHome />} />
        <NavbarLink href="/admin/users" text="Uživatelé" icon={<FiUsers />} />
        <NavbarLink href="/admin/blog" text="Blog" icon={<FiBook />} />
      </Navbar.Section>
      <Navbar.Section>
        <Group align="center">
          <Avatar size={40} src={user?.picture}></Avatar>
          <div style={{ flexGrow: 1 }}>
            <Text>{user?.name}</Text>
            <Text size="xs" color="dimmed">
              {user?.email}
            </Text>
          </div>

          <ActionIcon
            color="red"
            size={"lg"}
            onClick={() => {
              localStorage.removeItem("token");
              setUser(null);
              router.push("/");
            }}
          >
            <FiLogOut size="1.25rem" />
          </ActionIcon>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};

export default AdminNavbar;
