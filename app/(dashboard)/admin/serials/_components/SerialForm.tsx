"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/Select";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/Form";

import { createSerial, updateSerial } from "../actions";
import { uploadSerialImage } from "../upload";
import {
  SERIAL_STATUSES,
  serialFormSchema,
  serialFormDefaults,
  type SerialFormValues,
} from "../schema";

interface FormOptions {
  genres: { id: number; name: string }[];
  languages: { id: number; name: string }[];
  countries: { id: number; name: string }[];
  studios: { id: number; name: string }[];
}

interface SerialFormProps {
  options: FormOptions;
  serialId?: number;
  defaultValues?: Partial<SerialFormValues>;
}

// Sentinel for Select items, since Radix Select can't use an empty
// string as a value — mapped back to null/undefined before submitting.
const NONE = "none";

type SerialFormInput = z.input<typeof serialFormSchema>;
type SerialFormOutput = z.infer<typeof serialFormSchema>;

export const SerialForm = ({
  options,
  serialId,
  defaultValues,
}: SerialFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = (values: SerialFormValues) => {
    setServerError(null);
    startTransition(async () => {
      try {
        if (serialId) {
          await updateSerial(serialId, values);
          toast.success("Serial updated");
        } else {
          await createSerial(values);
          toast.success("Serial created");
        }
        router.push("/admin/serials");
        router.refresh();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setServerError(message);
        toast.error(message);
      }
    });
  };

  return <></>;
};

// ---------------------------------------------------------------------
// Same image-upload widget as MovieForm — kept local/duplicated rather
// than shared, to avoid coupling the two forms together.
// ---------------------------------------------------------------------
function ImageUploadField({
  label,
  category,
  slug,
  value,
  onChange,
  error,
  aspect,
}: {
  label: string;
  category: "poster" | "backdrop";
  slug: string;
  value: string;
  onChange: (url: string) => void;
  error?: string;
  aspect: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setIsUploading(true);
    setLocalError(null);
    try {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("category", category);
      formData.set("slug", slug || "untitled");
      const { url } = await uploadSerialImage(formData);
      onChange(url);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setLocalError(message);
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-white">{label}</p>
      <div
        className={`relative ${aspect} w-full max-w-56 rounded-xl border border-dashed border-white/15 bg-white/5 overflow-hidden flex items-center justify-center`}
      >
        {value ? (
          <Image src={value} alt={label} fill className="object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-white/30 text-xs px-3 text-center">
            <UploadCloud size={20} />
            No image yet
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <Loader2 className="animate-spin text-white" size={20} />
          </div>
        )}
      </div>
      <label className="inline-block">
        <span className="sr-only">Upload {label}</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        <Button type="button" variant="outline" size="sm" asChild>
          <span className="cursor-pointer">
            {value ? "Replace image" : "Upload image"}
          </span>
        </Button>
      </label>
      {(error || localError) && (
        <p className="text-xs text-destructive">{error || localError}</p>
      )}
    </div>
  );
}
