import {
  getMetadata,
  createGenre,
  deleteGenre,
  createLanguage,
  deleteLanguage,
  createCountry,
  deleteCountry,
  createStudio,
  deleteStudio,
} from "@/app/(dashboard)/admin/metadata/actions";
import { EntityManager } from "@/features/admin/EntityManager";

export default async function MetadataPage() {
  const { genres, languages, countries, studios } = await getMetadata();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-wide">
          Metadata
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Reference data used by the movie form — add these before creating
          movies that need them.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    </div>
  );
}
