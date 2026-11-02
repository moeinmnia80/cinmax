import { getSerial } from "@/data/serial";
import { EditForm } from "@/features/client";

interface EditSeriesProps {
  searchParams: Promise<{ edit?: string }>;
}

export const EditSeries = async ({ searchParams }: EditSeriesProps) => {
  const { edit } = await searchParams;
  const serial = await getSerial(edit);
  return (
    <>
      {edit && (
        <div className="absolute top-1 left-1 w-full backdrop-blur-2xl animate-slide-left rounded-xl overflow-hidden border border-foreground/10 bg-background/65 p-4">
          <h2>Edit Series</h2>
          <p className="text-sm uppercase text-foreground/30">
            {edit || "unsaved draft"}
          </p>
          <EditForm edit={edit} serial={serial} />
        </div>
      )}
    </>
  );
};
