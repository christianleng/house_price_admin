import type { Meta, StoryObj } from "@storybook/react-vite";
import { Section } from "@/shared/ui/section";

const meta = {
  title: "Layout/Section",
  component: Section,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-2xl p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Informations générales",
    children: (
      <p className="text-sm text-muted-foreground">
        Contenu de la section ici.
      </p>
    ),
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    title: "Localisation",
    description: "Adresse complète et coordonnées géographiques du bien.",
    children: (
      <p className="text-sm text-muted-foreground">Contenu de la section.</p>
    ),
  },
};
