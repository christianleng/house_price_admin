import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const meta = {
  title: "Atoms/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="12M">
      <TabsList>
        <TabsTrigger value="3M">3M</TabsTrigger>
        <TabsTrigger value="6M">6M</TabsTrigger>
        <TabsTrigger value="12M">12M</TabsTrigger>
        <TabsTrigger value="24M">24M</TabsTrigger>
        <TabsTrigger value="All">All</TabsTrigger>
      </TabsList>
      <TabsContent value="3M" className="p-4">
        Données pour 3 mois
      </TabsContent>
      <TabsContent value="6M" className="p-4">
        Données pour 6 mois
      </TabsContent>
      <TabsContent value="12M" className="p-4">
        Données pour 12 mois
      </TabsContent>
      <TabsContent value="24M" className="p-4">
        Données pour 24 mois
      </TabsContent>
      <TabsContent value="All" className="p-4">
        Toutes les données
      </TabsContent>
    </Tabs>
  ),
};

export const LineVariant: Story = {
  render: () => (
    <Tabs defaultValue="volume">
      <TabsList variant="line">
        <TabsTrigger value="time">Time Ladder</TabsTrigger>
        <TabsTrigger value="volume">Volume Ladder</TabsTrigger>
        <TabsTrigger value="comparison">Comparison</TabsTrigger>
      </TabsList>
      <TabsContent value="time" className="p-4">
        Vue Time Ladder
      </TabsContent>
      <TabsContent value="volume" className="p-4">
        Vue Volume Ladder
      </TabsContent>
      <TabsContent value="comparison" className="p-4">
        Vue Comparison
      </TabsContent>
    </Tabs>
  ),
};
