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
        <>
          <div
            data-scroll-lock
            role="dialog"
            aria-modal="true"
            aria-label="Edit movie"
            className="fixed inset-0 mt-14 sm:mt-0 z-50 overflow-y-auto overscroll-contain bg-background/40"
          >
            <div className="mx-auto min-h-full w-full max-w-3xl p-3 sm:p-6">
              <div className="animate-slide-left rounded-xl border border-foreground/10 bg-background/65 p-4 backdrop-blur-2xl">
                <h2>{serial ? "Edit serial" : "New serial"}</h2>
                <p className="text-sm uppercase text-foreground/30">
                  {serial ? edit : "unsaved draft"}
                </p>
                <EditForm edit={edit} serial={serial} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
