"use client";

import { AppShell, MantineProvider } from "@mantine/core";
import React, { FC } from "react";
import { useUser } from "../../utils/useUser";
import AdminNavbar from "../../components/admin/shared/Navbar";

const AdminLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();

  if (!user || !user.admin) {
    return <div>Not authorized</div>;
  }

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        navbar={<AdminNavbar />}
      >
        {children}
      </AppShell>
    </MantineProvider>
  );
};

export default AdminLayout;
