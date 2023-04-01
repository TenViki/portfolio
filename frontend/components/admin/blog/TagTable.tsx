import { Box } from "@mantine/core";
import React, { FC } from "react";

interface TagTableProps {
  value: string;
  color: string;
}

const TagTable: FC<TagTableProps> = ({ color, value }) => {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        cursor: "default",
        alignItems: "center",
        backgroundColor: color + "20",
        color: "#fff",
        paddingLeft: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 8,
      })}
    >
      <Box
        mr={8}
        sx={{
          backgroundColor: color,
          width: 10,
          height: 10,
          borderRadius: "50%",
        }}
      />
      <Box sx={{ lineHeight: 1 }}>{value}</Box>
    </Box>
  );
};

export default TagTable;
