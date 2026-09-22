"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pencil, Plus, Search, Star, Trash2, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/Table";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/AlertDialog";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/Pagination";

import { deleteMovie } from "../actions";

interface MovieRow {
  id: number;
  slug: string;
  title: string;
  image: string;
  year: number;
  category: string;
  rating: number;
  language: { name: string } | null;
}

interface MoviesTableProps {
  movies: MovieRow[];
  total: number;
  page: number;
  pageCount: number;
  search: string;
}

export const MoviesTable = ({
  movies,
  total,
  page,
  pageCount,
  search,
}: MoviesTableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(search);
  const [deleteTarget, setDeleteTarget] = useState<MovieRow | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();

  const pushParams = (params: Record<string, string>) => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    router.push(`${pathname}?${next.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    pushParams({ search: query, page: "1" });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    startDeleteTransition(async () => {
      await deleteMovie(deleteTarget.id);
      setDeleteTarget(null);
      router.refresh();
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <form
          onSubmit={handleSearchSubmit}
          className="relative w-full sm:max-w-xs"
        >
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies…"
            className="pl-9"
          />
        </form>
        <Button asChild>
          <Link href="/admin/movies/new" className="flex items-center gap-2">
            <Plus size={16} /> New movie
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Poster</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-white/40 py-10"
                >
                  No movies found.
                </TableCell>
              </TableRow>
            )}
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>
                  <div className="relative w-10 h-14 rounded-md overflow-hidden border border-white/10">
                    <Image
                      src={movie.image}
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-white">
                  {movie.title}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{movie.category}</Badge>
                </TableCell>
                <TableCell>{movie.year}</TableCell>
                <TableCell>{movie.language?.name ?? "—"}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star size={12} fill="#facc15" />
                    {movie.rating.toFixed(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/movies/${movie.id}`}>
                        <Pencil size={15} />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(movie)}
                    >
                      <Trash2 size={15} className="text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-white/40">
        <span>{total} movies total</span>
        {pageCount > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) pushParams({ page: String(page - 1) });
                  }}
                />
              </PaginationItem>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === page}
                    onClick={(e) => {
                      e.preventDefault();
                      pushParams({ page: String(p) });
                    }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < pageCount)
                      pushParams({ page: String(page + 1) });
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.title} ?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the movie and its genre links. This cant
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {isDeleting && (
                <Loader2 className="animate-spin mr-1" size={14} />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
