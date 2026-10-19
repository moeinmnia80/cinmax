import Link from "next/link";

import { getSerial } from "@/data/serial";
import { ImageUpload } from "./ImageUpload";
import { GenresField } from "./GenresField";
import { SerialStatus } from "@/types/types";
import { SubmitButton } from "@/features/client";
import { STATUS_OPTIONS } from "@/constants/seriesStatus";
import { CONTROL, Field, LABEL_TEXT, TextInput } from "@/components/Form";
import {
  Select,
  SelectItems,
  SelectLabel,
  SelectButton,
  SelectContent,
} from "@/components/ui/Select";
import { CastsField } from "./CastsField";

interface EditSeriesProps {
  searchParams: Promise<{ edit?: string }>;
}

export const EditSeries = async ({ searchParams }: EditSeriesProps) => {
  const { edit } = await searchParams;
  const serial = await getSerial(edit);

  const currentStatus =
    STATUS_OPTIONS.find(
      (option) => (option.id as SerialStatus) === serial?.status,
    ) ?? STATUS_OPTIONS[0];

  return (
    <div className="flex-2 animate-slide-left py-5 pr-4">
      <div className="rounded-md border border-foreground/10 bg-foreground/5 p-4">
        <h2>Edit Series</h2>
        <p className="text-sm uppercase text-foreground/30">
          {edit || "unsaved draft"}
        </p>
        <form key={edit} className="mt-5 grid grid-cols-4 gap-4">
          <Field label="title">
            <TextInput name="title" defaultValue={serial?.title} />
          </Field>
          <Field label="description">
            <textarea
              name="description"
              rows={3}
              defaultValue={serial?.description ?? ""}
              className={`${CONTROL} resize-none text-sm font-normal`}
            />
          </Field>
          <Field label="start year" className="col-span-2">
            <TextInput
              name="startYear"
              defaultValue={serial?.startYear ?? ""}
              inputMode="numeric"
            />
          </Field>
          <Field label="end year" className="col-span-2">
            <TextInput
              name="endYear"
              defaultValue={serial?.endYear ?? ""}
              placeholder="Blank if ongoing"
              inputMode="numeric"
            />
          </Field>
          <Field label="seasons" className="col-span-1">
            <TextInput
              name="seasons"
              defaultValue={serial?.seasons ?? ""}
              inputMode="numeric"
            />
          </Field>
          <Field label="episodes" className="col-span-1">
            <TextInput
              name="episodes"
              defaultValue={serial?.episodes ?? ""}
              inputMode="numeric"
            />
          </Field>
          <Field label="rating" className="col-span-1">
            <TextInput
              name="rating"
              defaultValue={serial?.rating ?? ""}
              inputMode="decimal"
            />
          </Field>
          <Field label="badge">
            <TextInput name="badge" defaultValue={serial?.badge ?? ""} />
          </Field>

          <Select
            name="status"
            defaultValue={currentStatus}
            className="col-span-4"
          >
            <SelectLabel className={LABEL_TEXT}>status</SelectLabel>
            <SelectButton className="mt-1 flex w-full rounded-sm border border-foreground/10 bg-foreground/5 px-2 py-2 text-sm font-normal" />
            <SelectContent className="mt-1 w-full animate-slide-down overflow-hidden rounded-lg border border-foreground/10 bg-foreground/5 text-sm font-normal backdrop-blur-2xl">
              {STATUS_OPTIONS.map((option) => (
                <SelectItems
                  key={option.id}
                  option={option}
                  className="flex h-12 cursor-pointer items-center px-4 hover:bg-b-secondary"
                >
                  <span className="truncate uppercase">{option.label}</span>
                </SelectItems>
              ))}
            </SelectContent>
          </Select>

          <GenresField
            name="genres"
            label="genres"
            className="col-span-4"
            defaultValue={serial?.genres.map(({ genre }) => genre.name)}
          />

          <Field label="language" className="col-span-2">
            <TextInput
              name="language"
              defaultValue={serial?.language.name ?? ""}
            />
          </Field>
          <Field label="country" className="col-span-2">
            <TextInput
              name="country"
              defaultValue={serial?.country?.name ?? ""}
            />
          </Field>
          <Field label="price">
            <TextInput
              name="purchasePrice"
              placeholder="Blank If Free"
              defaultValue={serial?.purchasePrice ?? ""}
            />
          </Field>
          <Field label="studio">
            <TextInput
              name="studio"
              defaultValue={serial?.studio?.name ?? ""}
            />
          </Field>

          <fieldset className="rounded-xl border border-foreground/10 p-4 col-span-4">
            <legend className="sr-only">Media</legend>
            <p className={LABEL_TEXT} aria-hidden="true">
              media
            </p>
            <div className="mt-2 grid grid-cols-2 items-start gap-4">
              <ImageUpload
                name="poster"
                label="poster"
                hint="2:3 · JPG/PNG"
                aspectClassName="aspect-[2/3]"
                defaultUrl={serial?.image}
              />
              <ImageUpload
                name="backdrop"
                label="backdrop"
                hint="16:9 · JPG/PNG"
                aspectClassName="aspect-video"
                defaultUrl={serial?.backdrop}
              />
            </div>
          </fieldset>
          <CastsField defaultValue={serial?.cast} />
          <SubmitButton className="col-span-3 rounded-lg bg-destructive/60 px-4 py-3 font-semibold text-background outline-0 transition hover:bg-destructive/50 focus-visible:ring-2 focus-visible:ring-destructive/40">
            Save changes
          </SubmitButton>
          <Link
            href="/admin/serials"
            className="col-span-1 rounded-lg border border-foreground/10 px-4 py-3 text-center text-foreground/60 outline-0 transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};
