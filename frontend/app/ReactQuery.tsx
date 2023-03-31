"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const ReactQueryContext: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const pathname = usePathname();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryContext;
