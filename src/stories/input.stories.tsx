import { Input } from "@/components/ui/input";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Search blocks, street, town...",
    type: "text",
  },
};
