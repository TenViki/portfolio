import React, { FC } from "react";
import AdminContext from "./AdminContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administrace",
};

const AdminLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AdminContext>{children}</AdminContext>;
};

export default AdminLayout;
