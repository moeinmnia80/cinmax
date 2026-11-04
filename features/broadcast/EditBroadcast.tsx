import { BroadcastForm } from "@/features/broadcast/BroadcastForm";
import {
  getBroadcastOptions,
  getBroadcastByContentSlug,
} from "@/data/broadcast";

export const EditBroadcast = async ({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) => {
  const { edit } = await searchParams;
  if (!edit) return null;

  const isNew = edit === "unsaved-draft";

  const [options, broadcast] = await Promise.all([
    getBroadcastOptions(),
    isNew ? null : getBroadcastByContentSlug(edit),
  ]);

  console.log(options, broadcast);

  if (!isNew && !broadcast) return null;

  return (
    <div
      data-scroll-lock
      role="dialog"
      aria-modal="true"
      aria-label={broadcast ? "Edit broadcast" : "New broadcast"}
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-background/40"
    >
      <div className="mx-auto min-h-full w-full max-w-3xl p-3 sm:p-6">
        <div className="animate-slide-left rounded-xl border border-foreground/10 bg-background/65 p-4 backdrop-blur-2xl">
          <h2>{broadcast ? "Edit broadcast" : "New broadcast"}</h2>
          <p className="text-sm uppercase text-foreground/30">
            {broadcast ? edit : "unsaved draft"}
          </p>
          <BroadcastForm key={edit} {...options} broadcast={broadcast} />
        </div>
      </div>
    </div>
  );
};
