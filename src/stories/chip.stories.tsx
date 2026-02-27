import { Chip } from "@/components/ui/chip";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Atoms/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "green", "brown"],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Chip",
    variant: "default",
  },
};

export const Green: Story = {
  args: {
    children: "Blk 90A TELOK BLANGAH",
    variant: "green",
  },
};

export const Brown: Story = {
  args: {
    children: "Blk 145 LOR 2 TOA PAYOH",
    variant: "brown",
  },
};
