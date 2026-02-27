import { FilterTag } from "@/components/molecules/filter-tag";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Molecules/FilterTag",
  component: FilterTag,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "blue", "green", "orange", "trending"],
    },
    onRemove: { action: "removed" },
  },
} satisfies Meta<typeof FilterTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GreenBlock: Story = {
  args: {
    label: "15 Rue de Vaugirard",
    subLabel: "4 PIÈCES",
    variant: "green",
  },
};

export const OrangeBlock: Story = {
  args: {
    label: "42 Avenue Victor Hugo",
    subLabel: "T3",
    variant: "orange",
  },
};

export const BlueBlock: Story = {
  args: {
    label: "10 Rue de Rivoli",
    subLabel: "T2",
    variant: "blue",
  },
};

export const WithoutSubLabel: Story = {
  args: {
    label: "Filtre Simple",
    variant: "default",
  },
};
