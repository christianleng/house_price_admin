import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { KpiCard } from "@/shared/ui/KpiCard";
import {
  IconHome,
  IconCurrencyEuro,
  IconEye,
  IconAlertTriangle,
} from "@tabler/icons-react";

const meta = {
  title: "Atoms/KpiCard",
  component: KpiCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-64">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  args: {
    loading: false,
    icon: IconHome,
    title: "Total biens",
    value: "142",
  },
} satisfies Meta<typeof KpiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTrendUp: Story = {
  args: {
    title: "Biens actifs",
    value: "98",
    trend: 12.5,
    subtitle: "Dont 62 à la vente",
    icon: IconHome,
  },
};

export const WithTrendDown: Story = {
  args: {
    title: "Prix moyen vente",
    value: "324 500 €",
    trend: -3.2,
    icon: IconCurrencyEuro,
  },
};

export const WithHref: Story = {
  args: {
    title: "Sans photos",
    value: "7",
    subtitle: "Biens sans visuels",
    href: "/admin/properties",
    icon: IconEye,
    colorClass: "text-status-warning",
  },
};

export const WithAlert: Story = {
  args: {
    title: "DPE à risque",
    value: "23",
    icon: IconAlertTriangle,
    colorClass: "text-status-error",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
