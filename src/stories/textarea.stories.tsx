import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "@/shared/ui/textarea";

const meta = {
  title: "Atoms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Saisissez une description...",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue:
      "Bel appartement lumineux au 3ème étage sans ascenseur, exposé plein sud. Double vitrage récent, parquet massif.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Champ désactivé",
  },
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    placeholder: "Champ en erreur",
  },
};
