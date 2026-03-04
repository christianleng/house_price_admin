import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/shared/ui/badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
        "blue",
        "green",
        "orange",
        "trending",
      ],
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge Standard",
    variant: "default",
  },
};

export const BlueBlock: Story = {
  args: {
    children: "10 Rue de Rivoli",
    variant: "blue",
  },
};

export const GreenBlock: Story = {
  args: {
    children: "15 Rue de Vaugirard",
    variant: "green",
  },
};

export const OrangeBlock: Story = {
  args: {
    children: "42 Avenue Victor Hugo",
    variant: "orange",
  },
};

export const Trending: Story = {
  args: {
    children: "TENDANCE",
    variant: "trending",
  },
};
