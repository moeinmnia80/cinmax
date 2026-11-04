"use client";

import { useActionState, useEffect, useMemo, useState } from "react";

import type { FeaturedType } from "@/types/types";
import type { getBroadcastByContentSlug } from "@/data/broadcast";
import { useFormChanges } from "@/hooks/useFormChanges";
import { BROADCAST_TYPES, WEEKDAYS } from "@/constants/broadcast";
import {
  CONTROL,
  DatePicker,
  Field,
  LABEL_TEXT,
  TextInput,
} from "@/components/Form";
import { ChipGroup } from "@/features/broadcast/ChipGroup";
import { EditFormActions } from "@/features/client";
import {
  deleteBroadcast,
  saveBroadcast,
  type SaveBroadcastState,
} from "@/app/actions/broadcast";

type Option = { id: number; title: string };
type BroadcastData = NonNullable<
  Awaited<ReturnType<typeof getBroadcastByContentSlug>>
>;

interface BroadcastFormProps {
  movies: Option[];
  serials: Option[];
  broadcast?: BroadcastData | null;
}

const initialState: SaveBroadcastState = {
  errors: {},
  message: "",
  success: false,
};

export const BroadcastForm = ({
  movies,
  serials,
  broadcast,
}: BroadcastFormProps) => {
  const [state, formAction, isPending] = useActionState(
    saveBroadcast,
    initialState,
  );
  const [type, setType] = useState<FeaturedType>(broadcast?.type ?? "Serial");

  const isMovie = type === "Movie";
  const targetName = isMovie ? "movieId" : "serialId";
  const options = isMovie ? movies : serials;
  const errors = state.errors ?? {};

  const requiredFields = useMemo(
    () => [targetName, "days", "time", "startDate"],
    [targetName],
  );

  const { formRef, dirty, valid, resetBaseline } =
    useFormChanges(requiredFields);

  const isEdit = Boolean(broadcast?.id);
  const canSave = valid && (!isEdit || dirty) && !isPending;

  useEffect(() => {
    if (state.success) resetBaseline();
  }, [state.success, resetBaseline]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4"
    >
      {broadcast ? (
        <>
          <input type="hidden" name="type" value={broadcast.type} />
          <input
            type="hidden"
            name={targetName}
            value={(isMovie ? broadcast.movieId : broadcast.serialId) ?? ""}
          />
          <div className="col-span-2 sm:col-span-4">
            <p className={LABEL_TEXT}>{broadcast.type}</p>
            <p className="mt-1 text-sm">
              {broadcast.movie?.title ?? broadcast.serial?.title}
            </p>
          </div>
        </>
      ) : (
        <>
          <ChipGroup
            type="radio"
            name="type"
            label="content type"
            options={BROADCAST_TYPES}
            defaultValue={[type]}
            onValueChange={(value) => setType(value as FeaturedType)}
            error={errors.type}
            className="col-span-2 sm:col-span-4"
          />

          <Field
            label={isMovie ? "movie" : "serial"}
            error={errors[targetName]}
            className="col-span-2 sm:col-span-4"
          >
            <select
              key={type} // reset the selection when the type changes
              name={targetName}
              defaultValue=""
              className={`${CONTROL} text-sm font-normal`}
            >
              <option value="" disabled>
                Select a {isMovie ? "movie" : "serial"}
              </option>
              {options.map(({ id, title }) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
          </Field>
        </>
      )}

      <Field
        label="label (optional)"
        error={errors.label}
        className="col-span-2 sm:col-span-4"
      >
        <TextInput
          name="label"
          placeholder="e.g. New episode every week"
          defaultValue={broadcast?.label ?? ""}
        />
      </Field>

      <ChipGroup
        type="checkbox"
        name="days"
        label="airs on"
        options={WEEKDAYS}
        defaultValue={broadcast?.days}
        error={errors.days}
        className="col-span-2 sm:col-span-4"
      />

      <Field label="time" error={errors.time} className="col-span-2">
        <TextInput name="time" defaultValue={broadcast?.time ?? ""} />
      </Field>

      <Field
        label="start date"
        error={errors.startDate}
        className="col-span-1 sm:col-start-1"
      >
        <DatePicker
          name="startDate"
          defaultValue={broadcast?.startDate?.toISOString().slice(0, 10)}
        />
      </Field>
      <Field label="end date" error={errors.endDate} className="col-span-1">
        <DatePicker
          name="endDate"
          defaultValue={broadcast?.endDate?.toISOString().slice(0, 10)}
        />
      </Field>

      <EditFormActions
        id={broadcast?.id}
        title={broadcast?.movie?.title ?? broadcast?.serial?.title}
        deleteAction={deleteBroadcast}
        message={state.message}
        success={state.success}
        canSave={canSave}
        className="col-span-2 sm:col-span-4"
      />
    </form>
  );
};
