import { getPerson } from "@/data/people";
import { EditPersonForm } from "@/features/client";

interface EditPeopleProps {
  searchParams: Promise<{ search?: string; edit?: string }>;
}

export const EditPeople = async ({ searchParams }: EditPeopleProps) => {
  const { edit } = await searchParams;
  const person = await getPerson(edit);
  return (
    <>
      {edit && (
        <div
          data-scroll-lock
          role="dialog"
          aria-modal="true"
          aria-label="Edit movie"
          className="fixed inset-0 mt-14 sm:mt-0 z-50 overflow-y-auto overscroll-contain bg-background/40"
        >
          <div className="mx-auto min-h-full w-full max-w-3xl p-3 sm:p-6">
            <div className="animate-slide-left rounded-xl border border-foreground/10 bg-background/65 p-4 backdrop-blur-2xl">
              <h2>{person ? "Edit movie" : "New movie"}</h2>
              <p className="text-sm uppercase text-foreground/30">
                {person ? edit : "unsaved draft"}
              </p>
              <EditPersonForm edit={edit} person={person} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
