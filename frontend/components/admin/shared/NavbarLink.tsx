import React, { FC } from "react";
import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

interface NavbarLinkProps {
  href: string;
  text: string;
  icon: React.ReactNode;
}

const NavbarLink: FC<NavbarLinkProps> = ({ href, icon, text }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colors.dark[0],
        transition: ".2s",

        "&:hover": {
          backgroundColor: theme.colors.dark[5],
        },

        "&:active": {
          backgroundColor: theme.colors.dark[6],
        },

        "&.active": {
          backgroundColor: theme.colors.dark[6],
        },
      })}
      onClick={() => {
        router.push(href);
      }}
      className={pathname === href ? "active" : ""}
    >
      <Group>
        <ThemeIcon color={"blue"} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{text}</Text>
      </Group>
    </UnstyledButton>
  );
};

export default NavbarLink;
