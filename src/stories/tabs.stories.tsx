import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/tabs";
import {
  RiTimeLine,
  RiBarChartGroupedLine,
  RiFileList3Line,
  RiLayoutGridLine,
  RiArrowLeftRightLine,
} from "@remixicon/react";

const meta = {
  title: "Atoms/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="6M">
      <TabsList variant="nav">
        <TabsTrigger value="3M">3M</TabsTrigger>
        <TabsTrigger value="6M">6M</TabsTrigger>
        <TabsTrigger value="12M">12M</TabsTrigger>
        <TabsTrigger value="24M">24M</TabsTrigger>
        <TabsTrigger value="All">All</TabsTrigger>
      </TabsList>
      <TabsContent value="3M">Données pour 3 mois</TabsContent>
      <TabsContent value="6M">Données pour 6 mois</TabsContent>
      <TabsContent value="12M">Données pour 12 mois</TabsContent>
      <TabsContent value="24M">Données pour 24 mois</TabsContent>
      <TabsContent value="All">Toutes les données</TabsContent>
    </Tabs>
  ),
};

export const NavVariant: Story = {
  render: () => (
    <Tabs defaultValue="time">
      <TabsList variant="nav">
        <TabsTrigger value="time">
          <RiTimeLine className="size-4" />
          Time Ladder
        </TabsTrigger>
        <TabsTrigger value="floor">
          <RiBarChartGroupedLine className="size-4" />
          Floor Ladder
        </TabsTrigger>
        <TabsTrigger value="volume">
          <RiArrowLeftRightLine className="size-4" />
          Volume Ladder
        </TabsTrigger>
        <TabsTrigger value="comparison">
          <RiLayoutGridLine className="size-4" />
          Comparison
        </TabsTrigger>
        <TabsTrigger value="cards">
          <RiFileList3Line className="size-4" />
          Block Cards
        </TabsTrigger>
      </TabsList>
      <TabsContent value="time">Vue Time Ladder</TabsContent>
      <TabsContent value="floor">Vue Floor Ladder</TabsContent>
      <TabsContent value="volume">Vue Volume Ladder</TabsContent>
      <TabsContent value="comparison">Vue Comparison</TabsContent>
      <TabsContent value="cards">Vue Block Cards</TabsContent>
    </Tabs>
  ),
};
