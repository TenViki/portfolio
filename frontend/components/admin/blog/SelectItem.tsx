import React, { forwardRef } from "react";
import {
  Box,
  CloseButton,
  Group,
  MultiSelectValueProps,
  Text,
} from "@mantine/core";

interface ItemProps {
  label: string;
  color: string;
  value: string;
}
export const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, color, value, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 4,
            backgroundColor: color,
          }}
        />

        <Text>{label}</Text>
      </Group>
    </div>
  )
);
export function Value({
  value,
  label,
  onRemove,
  classNames,
  ...others
}: MultiSelectValueProps & ItemProps) {
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          display: "flex",
          cursor: "default",
          alignItems: "center",
          backgroundColor: others.color + "20",
          color: "#fff",
          paddingLeft: theme.spacing.xs,
          borderRadius: theme.radius.sm,
        })}
      >
        <Box
          mr={8}
          sx={{
            backgroundColor: others.color,
            width: 10,
            height: 10,
            borderRadius: "50%",
          }}
        />
        <Box sx={{ lineHeight: 1 }}>{label}</Box>
        <CloseButton
          onClick={onRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
}
