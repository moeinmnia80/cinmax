"use client";

import { useActionState, useEffect } from "react";

import { Person } from "@/types/types";
import { useFormChanges } from "@/hooks/useFormChanges";
import { ImageUpload, EditFormActions } from "@/features/client";
import {
  deletePerson,
  savePerson,
  type PersonFormState,
} from "@/app/actions/people";
import {
  CONTROL,
  DatePicker,
  Field,
  LABEL_TEXT,
  TextInput,
} from "@/components/Form";
import {
  Select,
  SelectItems,
  SelectLabel,
  SelectButton,
  SelectContent,
} from "@/components/ui/Select";
import { ROLE_PEOPLE } from "@/constants/castRole";

const initialState: PersonFormState = {
  errors: {},
  message: "",
  success: false,
};

const REQUIRED_FIELDS = [
  "name",
  "role",
  "birthPlace",
  "height",
  "bio",
  "activeYears",
] as const;

export const EditPersonForm = ({
  edit,
  person,
}: {
  edit?: string;
  person: Person | null;
}) => {
  const [state, formAction, isPending] = useActionState(
    savePerson,
    initialState,
  );

  const { formRef, dirty, valid, resetBaseline } =
    useFormChanges(REQUIRED_FIELDS);

  const isEdit = Boolean(person?.id);
  const canSave = valid && (!isEdit || dirty) && !isPending;

  useEffect(() => {
    if (state.success) resetBaseline();
  }, [state, resetBaseline]);

  const currentRole =
    ROLE_PEOPLE.find((option) => option.id === person?.role) ?? ROLE_PEOPLE[0];

  return (
    <form
      key={edit}
      ref={formRef}
      action={formAction}
      className="mt-5 grid grid-cols-4 gap-4"
    >
      {person?.id && <input type="hidden" name="id" value={person.id} />}

      <Field label="name" className="col-span-4" error={state?.errors?.name}>
        <TextInput name="name" defaultValue={person?.name ?? ""} />
      </Field>

      <Select name="role" defaultValue={currentRole} className="col-span-4">
        <SelectLabel className={LABEL_TEXT}>role</SelectLabel>
        <SelectButton className="mt-1 flex w-full rounded-sm border border-foreground/10 bg-foreground/5 px-2 py-2 text-sm font-normal" />
        <SelectContent className="mt-1 w-full animate-slide-down overflow-hidden rounded-lg border border-foreground/10 bg-foreground/5 text-sm font-normal backdrop-blur-2xl">
          {ROLE_PEOPLE.map((option) => (
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
      <Field
        label="birth date"
        className="col-span-2"
        error={state?.errors?.birthDate}
      >
        <DatePicker
          name="birthDate"
          startView="years"
          defaultValue={person?.birthDate?.toISOString().slice(0, 10)}
        />
      </Field>
      <Field
        label="birth place"
        className="col-span-2"
        error={state?.errors?.birthPlace}
      >
        <TextInput name="birthPlace" defaultValue={person?.birthPlace ?? ""} />
      </Field>
      <Field
        label="height"
        className="col-span-2"
        error={state?.errors?.height}
      >
        <TextInput
          name="height"
          placeholder={`180 cm`}
          defaultValue={person?.height ?? ""}
        />
      </Field>
      <Field
        label="active years"
        className="col-span-2"
        error={state?.errors?.activeYears}
      >
        <TextInput
          name="activeYears"
          placeholder="2005–now"
          defaultValue={person?.activeYears ?? ""}
        />
      </Field>

      <Field label="bio" className="col-span-4" error={state?.errors?.bio}>
        <textarea
          name="bio"
          rows={4}
          defaultValue={person?.bio ?? ""}
          className={`${CONTROL} resize-none text-sm font-normal`}
        />
      </Field>

      <Field
        label="instagram"
        className="col-span-2"
        error={state?.errors?.socialInstagram}
      >
        <TextInput
          name="socialInstagram"
          defaultValue={person?.socialInstagram ?? ""}
        />
      </Field>
      <Field
        label="twitter / x"
        className="col-span-2"
        error={state?.errors?.socialTwitter}
      >
        <TextInput
          name="socialTwitter"
          defaultValue={person?.socialTwitter ?? ""}
        />
      </Field>
      <Field
        label="imdb"
        className="col-span-4"
        error={state?.errors?.socialImdb}
      >
        <TextInput name="socialImdb" defaultValue={person?.socialImdb ?? ""} />
      </Field>

      <fieldset className="col-span-4 rounded-xl border border-foreground/10 bg-foreground/5 p-4">
        <legend className="sr-only">Media</legend>
        <p className={LABEL_TEXT} aria-hidden="true">
          media
        </p>
        <div className="mt-2 max-w-48">
          <ImageUpload
            name="image"
            label="photo"
            hint="1:1 · JPG/PNG"
            aspectClassName="aspect-square"
            defaultUrl={person?.image}
          />
        </div>
      </fieldset>

      <EditFormActions
        id={person?.id}
        title={person?.name}
        deleteAction={deletePerson}
        message={state.message}
        success={state.success}
        canSave={canSave}
      />
    </form>
  );
};
