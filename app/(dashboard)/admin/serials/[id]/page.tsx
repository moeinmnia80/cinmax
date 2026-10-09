import { notFound } from "next/navigation";

import { getSerialById, getSerialFormOptions } from "../actions";
import { SerialForm } from "../_components/SerialForm";

interface EditSerialPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSerialPage({ params }: EditSerialPageProps) {
  const { id } = await params;
  const serialId = Number(id);

  if (!Number.isInteger(serialId)) notFound();

  const [serial, options] = await Promise.all([
    getSerialById(serialId),
    getSerialFormOptions(),
  ]);

  if (!serial) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-wide">
          Edit serial
        </h1>
        <p className="text-white/40 text-sm mt-1">{serial.title}</p>
      </div>

      <SerialForm
        options={options}
        serialId={serial.id}
        defaultValues={{
          title: serial.title,
          slug: serial.slug,
          rating: serial.rating,
          startYear: serial.startYear,
          endYear: serial.endYear ?? 0,
          seasons: serial.seasons,
          episodes: serial.episodes,
          description: serial.description,
          image: serial.image,
          backdrop: serial.backdrop ?? "",
          status: serial.status,
          badge: serial.badge ?? "",
          languageId: serial.languageId,
          countryId: serial.countryId,
          studioId: serial.studioId,
          genreIds: serial.genreIds,
        }}
      />
    </div>
  );
}
