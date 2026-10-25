"use client";

import { useActionState, useEffect } from "react";

import { MovieType } from "@/data/movies";
import { MovieCategory } from "@/types/types";
import { CATEGORY_OPTIONS } from "@/constants/movies";
import { useFormChanges } from "@/hooks/useFormChanges";
import { deleteMovie, saveMovie } from "@/app/actions/movie";
import { CONTROL, Field, LABEL_TEXT, TextInput } from "@/components/Form";
import {
  CastField,
  CrewField,
  ImageUpload,
  GenresField,
  EditFormActions,
} from "@/features/client";
import {
  Select,
  SelectItems,
  SelectLabel,
  SelectButton,
  SelectContent,
} from "@/components/ui/Select";

const initialState = {
  errors: {},
  message: "",
  success: false,
};

const REQUIRED_FIELDS = [
  "title",
  "description",
  "year",
  "durationMinutes",
  "rating",
  "language",
] as const;

export const EditMovieForm = ({
  edit,
  movie,
}: {
  edit?: string;
  movie: MovieType | null;
}) => {
  const [state, formAction, isPending] = useActionState(
    saveMovie,
    initialState,
  );
  const { formRef, dirty, valid, resetBaseline } =
    useFormChanges(REQUIRED_FIELDS);

  const isEdit = Boolean(movie?.id);
  const canSave = valid && (!isEdit || dirty) && !isPending;

  useEffect(() => {
    if (state.success) resetBaseline();
  }, [state, resetBaseline]);

  const currentCategory =
    CATEGORY_OPTIONS.find(
      (option) => (option.id as MovieCategory) === movie?.category,
    ) ?? CATEGORY_OPTIONS[0];

  return (
    <form
      key={edit}
      ref={formRef}
      action={formAction}
      className="mt-5 grid grid-cols-4 gap-4"
    >
      <Field label="title" className="col-span-4" error={state.errors?.title}>
        <TextInput name="title" defaultValue={movie?.title} />
      </Field>

      <Field
        label="tagline"
        className="col-span-4"
        error={state.errors?.tagline}
      >
        <TextInput name="tagline" defaultValue={movie?.tagline ?? ""} />
      </Field>

      <Field
        label="description"
        className="col-span-4"
        error={state.errors?.description}
      >
        <textarea
          name="description"
          rows={3}
          defaultValue={movie?.description ?? ""}
          className={`${CONTROL} resize-none text-sm font-normal`}
        />
      </Field>

      <Field
        label="long description"
        className="col-span-4"
        error={state.errors?.longDescription}
      >
        <textarea
          name="longDescription"
          rows={6}
          defaultValue={movie?.longDescription ?? ""}
          className={`${CONTROL} resize-y text-sm font-normal`}
        />
      </Field>

      <Field label="year" className="col-span-1" error={state.errors?.year}>
        <TextInput
          name="year"
          defaultValue={movie?.year ?? ""}
          inputMode="numeric"
        />
      </Field>
      <Field
        label="duration"
        className="col-span-1"
        error={state.errors?.durationMinutes}
      >
        <TextInput
          name="durationMinutes"
          defaultValue={movie?.durationMinutes ?? ""}
          placeholder="Minutes"
          inputMode="numeric"
        />
      </Field>
      <Field label="rating" className="col-span-1" error={state.errors?.rating}>
        <TextInput
          name="rating"
          defaultValue={movie?.rating ?? ""}
          inputMode="decimal"
        />
      </Field>
      <Field
        label="price"
        className="col-span-1"
        error={state.errors?.purchasePrice}
      >
        <TextInput
          name="purchasePrice"
          placeholder="Blank if free"
          defaultValue={movie?.purchasePrice ?? ""}
          inputMode="decimal"
        />
      </Field>
      <Select
        name="category"
        defaultValue={currentCategory}
        className="col-span-4"
      >
        <SelectLabel className={LABEL_TEXT}>category</SelectLabel>
        <SelectButton className="mt-1 flex w-full rounded-sm border border-foreground/10 bg-foreground/5 px-2 py-2 text-sm font-normal" />
        <SelectContent className="mt-1 w-full animate-slide-down overflow-hidden rounded-lg border border-foreground/10 bg-foreground/5 text-sm font-normal backdrop-blur-2xl">
          {CATEGORY_OPTIONS.map((option) => (
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
        defaultValue={(movie?.genres || []).map(({ genre }) => genre.name)}
      />
      <Field
        label="language"
        className="col-span-2"
        error={state.errors?.language}
      >
        <TextInput name="language" defaultValue={movie?.language?.name ?? ""} />
      </Field>
      <Field
        label="country"
        className="col-span-2"
        error={state.errors?.country}
      >
        <TextInput name="country" defaultValue={movie?.country?.name ?? ""} />
      </Field>

      <Field label="studio" className="col-span-2" error={state.errors?.studio}>
        <TextInput name="studio" defaultValue={movie?.studio?.name ?? ""} />
      </Field>
      <Field
        label="recognition"
        className="col-span-2"
        error={state.errors?.recognition}
      >
        <TextInput
          name="recognition"
          placeholder="e.g. Oscar winner"
          defaultValue={movie?.recognition ?? ""}
        />
      </Field>
      <Field label="budget" className="col-span-2" error={state.errors?.budget}>
        <TextInput
          name="budget"
          placeholder="USD"
          defaultValue={movie?.budget?.toString() ?? ""}
          inputMode="numeric"
        />
      </Field>
      <Field
        label="box office"
        className="col-span-2"
        error={state.errors?.boxOffice}
      >
        <TextInput
          name="boxOffice"
          placeholder="USD"
          defaultValue={movie?.boxOffice?.toString() ?? ""}
          inputMode="numeric"
        />
      </Field>

      <Field
        label="trailer"
        className="col-span-4"
        error={state.errors?.trailer}
      >
        <TextInput
          name="trailer"
          placeholder="https://"
          defaultValue={movie?.trailer ?? ""}
        />
      </Field>
      <fieldset className="bg-foreground/5 rounded-xl border border-foreground/10 p-4 col-span-4">
        <legend className="sr-only">Media</legend>
        <p className={LABEL_TEXT} aria-hidden="true">
          media
        </p>
        <div className="mt-2 grid grid-cols-2 items-start gap-4">
          <ImageUpload
            name="image"
            label="poster"
            hint="2:3 · JPG/PNG"
            aspectClassName="aspect-[2/3]"
            defaultUrl={movie?.image}
          />
          <ImageUpload
            name="backdrop"
            label="backdrop"
            hint="16:9 · JPG/PNG"
            aspectClassName="aspect-video"
            defaultUrl={movie?.backdrop}
          />
        </div>
      </fieldset>
      {movie?.id && (
        <>
          <CastField
            target={{ type: "movie", id: movie.id }}
            defaultValue={movie?.cast}
          />
          <CrewField
            target={{ type: "movie", id: movie.id }}
            defaultValue={movie?.crew}
          />
        </>
      )}
      <EditFormActions
        id={movie?.id}
        title={movie?.title}
        deleteAction={deleteMovie}
        message={state.message}
        success={state.success}
        canSave={canSave}
      />
    </form>
  );
};
