import { ActionIcon, Avatar, Group, Navbar, Text } from "@mantine/core";
import { FiBook, FiHome, FiLogOut, FiUsers } from "react-icons/fi";
import { useUser } from "utils/useUser";

import { useRouter } from "next/navigation";
import NavbarLink from "./NavbarLink";

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
