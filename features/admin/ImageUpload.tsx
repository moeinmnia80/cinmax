"use client";

import Image from "next/image";
import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

const ACCEPTED_TYPES = ["image/jpeg", "image/png"];
const MAX_SIZE_MB = 5;

interface ImageUploadProps {
  name: string;
  label: string;
  hint: string;
  aspectClassName: string;
  defaultUrl?: string | null;
  removable?: boolean;
}

export const ImageUpload = ({
  name,
  label,
  hint,
  aspectClassName,
  defaultUrl,
  removable = true,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  const [preview, setPreview] = useState<string | null>(defaultUrl ?? null);
  const [removed, setRemoved] = useState(false);
  const [error, setError] = useState("");

  const revokeObjectUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const restoreSaved = () => {
    revokeObjectUrl();
    if (inputRef.current) inputRef.current.value = "";
    setPreview(defaultUrl ?? null);
    setRemoved(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setError("");
      restoreSaved();
      return;
    }

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Use a JPG or PNG image.");
      restoreSaved();
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image must be under ${MAX_SIZE_MB} MB.`);
      restoreSaved();
      return;
    }

    setError("");
    revokeObjectUrl();
    objectUrlRef.current = URL.createObjectURL(file);
    setPreview(objectUrlRef.current);
    setRemoved(false);
  };

  const clear = () => {
    if (!removable) {
      setError("");
      restoreSaved();
      return;
    }

    revokeObjectUrl();
    if (inputRef.current) inputRef.current.value = "";
    setPreview(null);
    setRemoved(Boolean(defaultUrl));
    setError("");
  };

  return (
    <div className="min-w-0">
      <span className="block text-xs tracking-widest uppercase text-foreground/60">
        {label}
      </span>

      <div className="relative mt-2">
        <label
          className={`relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-foreground/15 bg-foreground/5 text-center transition hover:border-foreground/30 has-focus-visible:border-foreground/50 ${aspectClassName}`}
        >
          <span className="sr-only">Upload {label}</span>
          <input
            ref={inputRef}
            type="file"
            name={name}
            accept={ACCEPTED_TYPES.join(",")}
            onChange={onChange}
            className="sr-only"
          />

          {preview ? (
            <Image
              src={preview}
              alt={`${label} preview`}
              width={200}
              height={200}
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <>
              <Plus className="size-4 text-foreground/50" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="mt-2 text-xs tracking-widest uppercase text-foreground/50"
              >
                Upload
              </span>
              <span
                aria-hidden="true"
                className="mt-1 text-xs text-foreground/40"
              >
                {hint}
              </span>
            </>
          )}
        </label>

        {preview && (removable || preview !== defaultUrl) && (
          <button
            type="button"
            onClick={clear}
            aria-label={removable ? `Remove ${label}` : `Undo new ${label}`}
            className="absolute top-2 right-2 rounded-full bg-background/80 p-1 text-foreground/80 backdrop-blur-sm outline-0 transition hover:text-foreground focus-visible:ring-1 focus-visible:ring-foreground/50"
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>
        )}
      </div>

      {removed && <input type="hidden" name={`${name}Removed`} value="1" />}

      {error && (
        <p role="alert" className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};
