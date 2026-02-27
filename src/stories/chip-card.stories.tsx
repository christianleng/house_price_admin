import { ChipCard } from "@/components/ui/chip-card";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Atoms/ChipCard",
  component: ChipCard,
  tags: ["autodocs"],
  argTypes: {
    selected: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof ChipCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Selectable Option",
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    children: "Selected Option",
    selected: true,
  },
};
