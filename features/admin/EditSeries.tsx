import { getSerial } from "@/data/serial";
import { EditForm } from "@/features/client";

interface EditSeriesProps {
  searchParams: Promise<{ edit?: string }>;
}

export const EditSeries = async ({ searchParams }: EditSeriesProps) => {
  const { edit } = await searchParams;
  const serial = await getSerial(edit);

  return (
    <div className="flex-2 animate-slide-left py-5 pr-4">
      <div className="rounded-md border border-foreground/10 bg-foreground/5 p-4">
        <h2>Edit Series</h2>
        <p className="text-sm uppercase text-foreground/30">
          {edit || "unsaved draft"}
        </p>
        <EditForm edit={edit} serial={serial} />
      </div>
    </div>
  );
};
