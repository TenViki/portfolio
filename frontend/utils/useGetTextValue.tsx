import { Button, Group, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";

export const getUserTextInput = async (
  title: string,
  prompt: React.ReactNode
) => {
  return new Promise((resolve) => {
    let value = "";

    modals.open({
      title,

      styles: {
        overlay: {
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(16px)",
          zIndex: 202,
        },
      },

      children: (
        <>
          {prompt}
          <Group grow>
            <TextInput
              placeholder="Vložte textovou hodnotu"
              onChange={(e) => {
                value = e.currentTarget.value;
              }}
            />

            <Button
              onClick={() => {
                resolve(value);
                modals.closeAll();
              }}
            >
              Potvrdit
            </Button>
          </Group>
        </>
      ),
    });
  });
};
