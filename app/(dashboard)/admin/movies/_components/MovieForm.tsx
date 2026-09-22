"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { Resolver } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

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

import { createMovie, updateMovie } from "../actions";
import { uploadMovieImage } from "../upload";
import {
  MOVIE_CATEGORIES,
  movieFormSchema,
  movieFormDefaults,
  type MovieFormValues,
} from "../schema";

interface FormOptions {
  genres: { id: number; name: string }[];
  languages: { id: number; name: string }[];
  countries: { id: number; name: string }[];
  studios: { id: number; name: string }[];
}

interface MovieFormProps {
  options: FormOptions;
  movieId?: number;
  defaultValues?: Partial<MovieFormValues>;
}

// Sentinel used in the Select components below, since Radix Select
// items can't have an empty-string value — we map it back to
// `null`/`undefined` before submitting.
const NONE = "none";

export const MovieForm = ({
  options,
  movieId,
  defaultValues,
}: MovieFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<MovieFormValues>({
    resolver: zodResolver(
      movieFormSchema,
    ) as unknown as Resolver<MovieFormValues>,
    defaultValues: { ...movieFormDefaults, ...defaultValues },
  });

  const onSubmit = (values: MovieFormValues) => {
    setServerError(null);
    startTransition(async () => {
      try {
        if (movieId) {
          await updateMovie(movieId, values);
        } else {
          await createMovie(values);
        }
        router.push("/admin/movies");
        router.refresh();
      } catch (err) {
        setServerError(
          err instanceof Error ? err.message : "Something went wrong",
        );
      }
    });
  };

  const titleValue = form.watch("title");

  const handleGenerateSlug = () => {
    const slug = titleValue
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    form.setValue("slug", slug, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {serverError && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {serverError}
          </div>
        )}

        {/* ---------- Basics ---------- */}
        <section className="rounded-2xl border border-white/10 bg-card p-6 space-y-5">
          <h3 className="text-white font-bold uppercase tracking-wider text-sm">
            Basics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="IRON VEIL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input placeholder="iron-veil" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGenerateSlug}
                    >
                      Generate
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tagline</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Some borders are drawn in blood."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (0-10)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      min={0}
                      max={10}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="votesCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vote count</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="1200000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="durationMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} placeholder="125" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MOVIE_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* ---------- Descriptions ---------- */}
        <section className="rounded-2xl border border-white/10 bg-card p-6 space-y-5">
          <h3 className="text-white font-bold uppercase tracking-wider text-sm text-primary">
            Descriptions
          </h3>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short description</FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full plot (optional)</FormLabel>
                <FormControl>
                  <Textarea rows={6} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* ---------- Images ---------- */}
        <section className="rounded-2xl border border-white/10 bg-card p-6 space-y-5">
          <h3 className="text-white font-bold uppercase tracking-wider text-sm text-primary">
            Images
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploadField
              label="Poster (portrait)"
              category="poster"
              slug={form.watch("slug")}
              value={form.watch("image")}
              onChange={(url) =>
                form.setValue("image", url, { shouldValidate: true })
              }
              error={form.formState.errors.image?.message}
              aspect="aspect-[2/3]"
            />
            <ImageUploadField
              label="Backdrop (wide)"
              category="backdrop"
              slug={form.watch("slug")}
              value={form.watch("backdrop")}
              onChange={(url) =>
                form.setValue("backdrop", url, { shouldValidate: true })
              }
              error={form.formState.errors.backdrop?.message}
              aspect="aspect-video"
            />
          </div>
          <FormField
            control={form.control}
            name="trailer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trailer URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* ---------- Relations ---------- */}
        <section className="rounded-2xl border border-white/10 bg-card p-6 space-y-5">
          <h3 className="text-white font-bold uppercase tracking-wider text-sm text-primary">
            Language, Origin &amp; Genres
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="languageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(v) => field.onChange(Number(v))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.languages.map((l) => (
                        <SelectItem key={l.id} value={String(l.id)}>
                          {l.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {options.languages.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No languages yet — add one under Metadata first.
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="countryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country (optional)</FormLabel>
                  <Select
                    value={field.value ? String(field.value) : NONE}
                    onValueChange={(v) =>
                      field.onChange(v === NONE ? null : Number(v))
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={NONE}>—</SelectItem>
                      {options.countries.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studioId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Studio (optional)</FormLabel>
                  <Select
                    value={field.value ? String(field.value) : NONE}
                    onValueChange={(v) =>
                      field.onChange(v === NONE ? null : Number(v))
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select studio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={NONE}>—</SelectItem>
                      {options.studios.map((s) => (
                        <SelectItem key={s.id} value={String(s.id)}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="genreIds"
            render={() => (
              <FormItem>
                <FormLabel>Genres</FormLabel>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {options.genres.map((genre) => {
                    const checked = form.watch("genreIds").includes(genre.id);
                    return (
                      <label
                        key={genre.id}
                        className="flex items-center gap-2 text-sm text-white/70 cursor-pointer"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(value) => {
                            const current = form.getValues("genreIds");
                            form.setValue(
                              "genreIds",
                              value
                                ? [...current, genre.id]
                                : current.filter((id) => id !== genre.id),
                              { shouldValidate: true },
                            );
                          }}
                        />
                        {genre.name}
                      </label>
                    );
                  })}
                </div>
                {options.genres.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    No genres yet — add some under Metadata first.
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* ---------- Business info ---------- */}
        <section className="rounded-2xl border border-white/10 bg-card p-6 space-y-5">
          <h3 className="text-white font-bold uppercase tracking-wider text-sm text-primary">
            Business info (optional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget (USD, 0 = unknown)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="94000000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="boxOffice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Box office (USD, 0 = unknown)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="412000000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recognition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recognition</FormLabel>
                  <FormControl>
                    <Input placeholder="Audience Choice — Toronto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isPending} className="min-w-32">
            {isPending && <Loader2 className="animate-spin" size={16} />}
            {movieId ? "Save changes" : "Create movie"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/movies")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

// ---------------------------------------------------------------------
// Small local component: handles picking a file, uploading it to S3 via
// the `uploadMovieImage` server action, and previewing the result.
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
      const { url } = await uploadMovieImage(formData);
      onChange(url);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Upload failed");
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
