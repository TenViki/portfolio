import { Nunito } from "next/font/google";
import React from "react";
import { Metadata } from "next";
import "../scss/index.scss";
import ReactQueryContext from "./ReactQuery";
import WebDataContext from "./Context";
import AppContextSettings from "./Context";
import { AnimatePresence } from "framer-motion";

const inter = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viki",
  description: "Webová aplikace pro kontrolu a opravu textů",
  colorScheme: "dark",
  viewport: "width=device-width, initial-scale=1",
  icons: [
    {
      url: "/assets/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className}>
      <head />

      <body>
        <div id="root">
          <ReactQueryContext>
            <AppContextSettings>{children}</AppContextSettings>
          </ReactQueryContext>
        </div>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </body>
    </html>
  );
}
