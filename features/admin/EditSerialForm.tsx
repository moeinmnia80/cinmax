"use client";

import { useActionState, useEffect } from "react";

import { SerialType } from "@/data/serial";
import { SerialStatus } from "@/types/types";
import { deleteSerial, saveSerial } from "@/app/actions/serial";
import { STATUS_OPTIONS } from "@/constants/serials";
import { useFormChanges } from "@/hooks/useFormChanges";
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
  "startYear",
  "language",
  "country",
  "studio",
  "rating",
] as const;

export const EditForm = ({
  edit,
  serial,
}: {
  edit?: string;
  serial: SerialType | null;
}) => {
  const [state, formAction, isPending] = useActionState(
    saveSerial,
    initialState,
  );
  const { formRef, dirty, valid, resetBaseline } =
    useFormChanges(REQUIRED_FIELDS);

  const isEdit = Boolean(serial?.id);
  const canSave = valid && (!isEdit || dirty) && !isPending;

  useEffect(() => {
    if (state.success) resetBaseline();
  }, [state, resetBaseline]);

  const currentStatus =
    STATUS_OPTIONS.find(
      (option) => (option.id as SerialStatus) === serial?.status,
    ) ?? STATUS_OPTIONS[0];

  return (
    <form
      key={edit}
      ref={formRef}
      action={formAction}
      className="mt-5 grid grid-cols-4 gap-4"
    >
      <Field label="title" error={state.errors?.title}>
        <TextInput name="title" defaultValue={serial?.title} />
      </Field>
      <Field label="description" error={state.errors?.description}>
        <textarea
          name="description"
          rows={3}
          defaultValue={serial?.description ?? ""}
          className={`${CONTROL} resize-none text-sm font-normal`}
        />
      </Field>
      <Field
        label="start year"
        className="col-span-2"
        error={state.errors?.startYear}
      >
        <TextInput
          name="startYear"
          defaultValue={serial?.startYear ?? ""}
          inputMode="numeric"
        />
      </Field>
      <Field
        label="end year"
        className="col-span-2"
        error={state.errors?.endYear}
      >
        <TextInput
          name="endYear"
          defaultValue={serial?.endYear ?? ""}
          placeholder="Blank if ongoing"
          inputMode="numeric"
        />
      </Field>
      <Field
        label="seasons"
        className="col-span-1"
        error={state.errors?.seasons}
      >
        <TextInput
          name="seasons"
          defaultValue={serial?.seasons ?? ""}
          inputMode="numeric"
        />
      </Field>
      <Field
        label="episodes"
        className="col-span-1"
        error={state.errors?.episodes}
      >
        <TextInput
          name="episodes"
          defaultValue={serial?.episodes ?? ""}
          inputMode="numeric"
        />
      </Field>
      <Field label="rating" className="col-span-1" error={state.errors?.rating}>
        <TextInput
          name="rating"
          defaultValue={serial?.rating ?? ""}
          inputMode="decimal"
        />
      </Field>
      <Field label="duration" className="col-span-1">
        <TextInput
          name="durationMinutes"
          defaultValue={serial?.durationMinutes ?? ""}
          inputMode="numeric"
        />
      </Field>
      <Field label="badge" error={state.errors?.badge}>
        <TextInput name="badge" defaultValue={serial?.badge ?? ""} />
      </Field>

      <Select name="status" defaultValue={currentStatus} className="col-span-4">
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
        defaultValue={(serial?.genres || []).map(({ genre }) => genre.name)}
      />

      <Field
        label="language"
        className="col-span-2"
        error={state.errors?.language}
      >
        <TextInput
          name="language"
          defaultValue={serial?.language?.name ?? ""}
        />
      </Field>
      <Field
        label="country"
        className="col-span-2"
        error={state.errors?.country}
      >
        <TextInput name="country" defaultValue={serial?.country?.name ?? ""} />
      </Field>
      <Field label="price" error={state.errors?.purchasePrice}>
        <TextInput
          name="purchasePrice"
          placeholder="Blank If Free"
          defaultValue={serial?.purchasePrice ?? ""}
        />
      </Field>
      <Field label="studio" error={state.errors?.studio}>
        <TextInput name="studio" defaultValue={serial?.studio?.name ?? ""} />
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
      {serial?.id && (
        <>
          <CastField
            target={{ type: "serial", id: serial.id }}
            defaultValue={serial?.cast}
          />
          <CrewField
            target={{ type: "serial", id: serial.id }}
            defaultValue={serial?.crew}
          />
        </>
      )}
      <EditFormActions
        id={serial?.id}
        title={serial?.title}
        deleteAction={deleteSerial}
        message={state.message}
        success={state.success}
        canSave={canSave}
      />
    </form>
  );
};
