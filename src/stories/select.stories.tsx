import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

const meta = {
  title: "Atoms/Select",
  component: Select,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-48 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Sélectionner..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="sale">Vente</SelectItem>
        <SelectItem value="rent">Location</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Type de bien..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Résidentiel</SelectLabel>
          <SelectItem value="apartment">Appartement</SelectItem>
          <SelectItem value="house">Maison</SelectItem>
          <SelectItem value="studio">Studio</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Commercial</SelectLabel>
          <SelectItem value="office">Bureau</SelectItem>
          <SelectItem value="retail">Commerce</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Small: Story = {
  render: () => (
    <Select>
      <SelectTrigger size="sm">
        <SelectValue placeholder="Taille sm" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger>
        <SelectValue placeholder="Désactivé" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
      </SelectContent>
    </Select>
  ),
};
