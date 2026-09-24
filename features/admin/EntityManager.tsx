"use client";

import { useState, useTransition } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/Table";

interface EntityItem {
  id: number;
  name: string;
  code?: string;
}

interface EntityManagerProps {
  title: string;
  description: string;
  items: EntityItem[];
  withCode?: boolean;
  onCreate: (name: string, code: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export const EntityManager = ({
  title,
  description,
  items,
  withCode = false,
  onCreate,
  onDelete,
}: EntityManagerProps) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || (withCode && !code.trim())) return;
    startTransition(async () => {
      await onCreate(name.trim(), code.trim());
      setName("");
      setCode("");
    });
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    startTransition(async () => {
      await onDelete(id);
      setDeletingId(null);
    });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
      <div>
        <h3 className="text-white font-bold uppercase tracking-wider text-sm">
          {title}
        </h3>
        <p className="text-white/40 text-xs mt-0.5">{description}</p>
      </div>

      <form onSubmit={handleCreate} className="flex gap-2 flex-wrap">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="max-w-48"
        />
        {withCode && (
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code (e.g. en, USA)"
            className="max-w-32"
          />
        )}
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? (
            <Loader2 className="animate-spin" size={14} />
          ) : (
            <Plus size={14} />
          )}
          Add
        </Button>
      </form>

      <div className="rounded-lg border border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              {withCode && <TableHead>Code</TableHead>}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={withCode ? 3 : 2}
                  className="text-center text-white/40 py-6"
                >
                  None yet.
                </TableCell>
              </TableRow>
            )}
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                {withCode && <TableCell>{item.code}</TableCell>}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    disabled={isPending}
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="animate-spin" size={14} />
                    ) : (
                      <Trash2 size={14} className="text-destructive" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
