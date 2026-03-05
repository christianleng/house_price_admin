import { Chip } from "@/shared/ui/chip";
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
    children: "Chip par défaut",
    variant: "default",
  },
};

export const Green: Story = {
  args: {
    children: "15 Rue de Vaugirard",
    variant: "green",
  },
};

export const Brown: Story = {
  args: {
    children: "42 Avenue Victor Hugo",
    variant: "brandOrange",
  },
};
