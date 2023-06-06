"use client";

import { AppShell, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import AdminNavbar from "components/admin/shared/Navbar";
import React, { FC, ReactNode } from "react";
import { useUser } from "utils/useUser";

const AdminContext: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useUser();

  if (!user || !user.admin) {
    return <>Not authorized</>;
  }

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <ModalsProvider>
        <AppShell
          padding="md"
          navbarOffsetBreakpoint="sm"
          navbar={<AdminNavbar />}
        >
          {children}
          <Notifications />
        </AppShell>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default AdminContext;
