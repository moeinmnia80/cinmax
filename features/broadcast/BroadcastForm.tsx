// features/admin/broadcasts/BroadcastForm.tsx
"use client";

import { useActionState, useEffect, useMemo, useState } from "react";

import { EditFormActions } from "@/features/client";
import { useFormChanges } from "@/hooks/useFormChanges";
import { ChipGroup } from "@/features/broadcast/ChipGroup";
import { CONTROL, Field, TextInput } from "@/components/Form";
import { BROADCAST_TYPES, WEEKDAYS } from "@/constants/broadcast";
import { deleteBroadcast, saveBroadcast } from "@/app/actions/broadcast";
import { BroadcastData } from "@/data/broadcast";
import { FeaturedType } from "@/types/types";

type Option = { id: number; title: string };

type BroadcastFormProps = {
  movies: Option[];
  serials: Option[];
  broadcast?: BroadcastData | null;
};

const initialState = { errors: {}, message: "", success: false };

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

  const targetName = type === "Movie" ? "movieId" : "serialId";
  const requiredFields = useMemo(
    () => [targetName, "days", "time", "startDate"],
    [targetName],
  );

  const { formRef, dirty, valid, resetBaseline } =
    useFormChanges(requiredFields);

  const isEdit = Boolean(broadcast?.id);
  const canSave = valid && (!isEdit || dirty) && !isPending;
  const options = type === "Movie" ? movies : serials;

  useEffect(() => {
    if (state.success) resetBaseline();
  }, [state.success, resetBaseline]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-5 grid grid-cols-4 gap-4"
    >
      {broadcast && <input type="hidden" name="id" value={broadcast.id} />}

      <ChipGroup
        type="radio"
        name="type"
        label="content type"
        options={BROADCAST_TYPES}
        defaultValue={[type]}
        onValueChange={(v) => setType(v as "Movie" | "Serial")}
        className="col-span-4"
      />

      <Field
        label={type === "Movie" ? "movie" : "serial"}
        className="col-span-4"
        error={state?.errors?.[targetName]}
      >
        <select
          key={type}
          name={targetName}
          defaultValue={
            (type === "Movie" ? broadcast?.movieId : broadcast?.serialId) ?? ""
          }
          className={`${CONTROL} text-sm font-normal`}
        >
          <option value="" disabled>
            Select a {type === "Movie" ? "movie" : "serial"}
          </option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.title}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="label (optional)"
        className="col-span-4"
        error={state?.errors?.label}
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
        error={state?.errors?.days}
        className="col-span-4"
      />

      <Field label="time" className="col-span-2" error={state?.errors?.time}>
        <input type="time" name="time" defaultValue={broadcast?.time ?? ""} />
        {/* <TextInput
          name="time"
          type="time"
          defaultValue={broadcast?.time ?? ""}
        /> */}
      </Field>
      <div className="col-span-2" />

      <Field
        label="start date"
        className="col-span-2"
        error={state?.errors?.startDate}
      >
        <input type="date" name="startDate" />
        {/* 
        <TextInput
          name="startDate"
          type="date"
          defaultValue={toDateInput(broadcast?.startDate)}
        /> */}
      </Field>
      <Field
        label="end date"
        className="col-span-2"
        error={state?.errors?.endDate}
      >
        <input type="time" name="time" />

        {/* <TextInput
          name="endDate"
          type="date"
          placeholder="Blank if ongoing"
          defaultValue={toDateInput(broadcast?.endDate)}
        /> */}
      </Field>

      <EditFormActions
        id={broadcast?.id}
        title={broadcast?.label ?? undefined}
        deleteAction={deleteBroadcast}
        message={state.message}
        success={state.success}
        canSave={canSave}
      />
    </form>
  );
};
