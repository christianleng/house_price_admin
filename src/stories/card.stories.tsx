import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

const meta = {
  title: "Atoms/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Titre de la carte</CardTitle>
        <CardDescription>Description optionnelle</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Contenu principal de la carte.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Bien immobilier</CardTitle>
        <CardDescription>Paris 75001</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Appartement 3 pièces — 65 m²
        </p>
      </CardContent>
      <CardFooter className="border-t">
        <Button size="sm" variant="outline">
          Voir le détail
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Small: Story = {
  render: () => (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Carte compacte</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">Version sm.</p>
      </CardContent>
    </Card>
  ),
};
