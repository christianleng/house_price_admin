import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Pagination from "@/shared/ui/Pagination";

const meta = {
  title: "Atoms/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: {
    page: 1,
    pages: 5,
    total: 87,
    onPageChange: () => {},
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LastPage: Story = {
  args: { page: 5, pages: 5, total: 87 },
};

export const SinglePage: Story = {
  args: { page: 1, pages: 1, total: 12 },
};

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        page={page}
        pages={8}
        total={150}
        onPageChange={setPage}
      />
    );
  },
};
