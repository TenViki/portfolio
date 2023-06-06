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
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: {
    template: "%s | VikiTheDev",
    absolute: "VikiTheDev",
  },
  colorScheme: "dark",
  viewport: "width=device-width, initial-scale=1",
  icons: [
    {
      url: "/favicon.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.variable}>
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
