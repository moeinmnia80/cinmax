import { getMetadata } from "@/data/metaData";
import { AdminHeader } from "@/features/server";
import { EntityManager } from "@/features/client";
import {
  createGenre,
  deleteGenre,
  createStudio,
  deleteStudio,
  createCountry,
  deleteCountry,
  deleteLanguage,
  createLanguage,
} from "@/app/actions/metadata";

export default async function MetadataPage() {
  const { genres, languages, countries, studios } = await getMetadata();

  return (
    <>
      <AdminHeader
        title="Metadata"
        desc="Reference data used by the movie form — add these before creating
          movies that need them."
      />
      <div className="hidden sm:block absolute top-19 right-0 w-full h-full border-t border-l border-foreground/10 rounded-tl-2xl -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-3">
        <EntityManager
          title="Genres"
          description="Action, Sci-Fi, Thriller…"
          items={genres}
          onCreate={async (name) => {
            "use server";
            await createGenre(name);
          }}
          onDelete={async (id) => {
            "use server";
            await deleteGenre(id);
          }}
        />

        <EntityManager
          title="Languages"
          description="Primary spoken language of a movie."
          items={languages}
          withCode
          onCreate={async (name, code) => {
            "use server";
            await createLanguage(name, code);
          }}
          onDelete={async (id) => {
            "use server";
            await deleteLanguage(id);
          }}
        />

        <EntityManager
          title="Countries"
          description="Country of production."
          items={countries}
          withCode
          onCreate={async (name, code) => {
            "use server";
            await createCountry(name, code);
          }}
          onDelete={async (id) => {
            "use server";
            await deleteCountry(id);
          }}
        />

        <EntityManager
          title="Studios"
          description="Production studio."
          items={studios}
          onCreate={async (name) => {
            "use server";
            await createStudio(name);
          }}
          onDelete={async (id) => {
            "use server";
            await deleteStudio(id);
          }}
        />
      </div>
    </>
  );
}
