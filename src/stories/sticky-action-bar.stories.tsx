import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StickyActionBar } from "@/shared/ui/StickyActionBar";
import type { UpdatePropertyPayload } from "@/00-domain/entities";

const meta = {
  title: "Atoms/StickyActionBar",
  component: StickyActionBar,
  tags: ["autodocs"],
} satisfies Meta<typeof StickyActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// StickyActionBar dépend de useFormState({ control }) de react-hook-form
// et ne s'affiche que si isDirty est true — on crée un wrapper pour chaque story.

export const Visible: Story = {
  render: () => {
    const { control, setValue } = useForm<UpdatePropertyPayload>({
      defaultValues: { title: "Original" },
    });

    useEffect(() => {
      setValue("title", "Modifié", { shouldDirty: true });
    }, [setValue]);

    return (
      <div className="relative h-40 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          La barre apparaît en bas quand le formulaire est modifié.
        </p>
        <StickyActionBar
          control={control}
          isSaving={false}
          onCancel={() => {}}
        />
      </div>
    );
  },
};

export const Saving: Story = {
  render: () => {
    const { control, setValue } = useForm<UpdatePropertyPayload>({
      defaultValues: { title: "Original" },
    });

    useEffect(() => {
      setValue("title", "Modifié", { shouldDirty: true });
    }, [setValue]);

    return (
      <div className="relative h-40">
        <StickyActionBar
          control={control}
          isSaving={true}
          onCancel={() => {}}
        />
      </div>
    );
  },
};

export const Hidden: Story = {
  render: () => {
    const { control } = useForm<UpdatePropertyPayload>({
      defaultValues: { title: "Original" },
    });

    return (
      <div className="relative h-40 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Aucune modification → barre invisible.
        </p>
        <StickyActionBar
          control={control}
          isSaving={false}
          onCancel={() => {}}
        />
      </div>
    );
  },
};
