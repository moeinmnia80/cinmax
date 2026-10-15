"use client";

import { useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface SerialActionsProps {
  serialId: number;
  slug: string;
}

export const SerialActions = ({ serialId, slug }: SerialActionsProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  const handleEdit = () => {
    if (isEdit) {
      setIsEdit(false);
      params.delete("edit");
    } else {
      setIsEdit(true);
      params.set("edit", slug);
    }
    replace(`${pathname}?${params}`);
  };

  const handleDelete = () => {
    console.log("Delete serial:", serialId);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleEdit}
        className="px-2 py-1 text-xs bg-foreground/5 text-foreground/60 rounded hover:bg-gray-200/20 transition uppercase"
      >
        {isEdit ? <Check size={15} className="text-foreground/60" /> : "Edit"}
      </button>
      <button
        onClick={handleDelete}
        className="px-2 py-1 text-xs bg-red-500/10 text-destructive/40 rounded hover:bg-destructive/20 transition uppercase"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
};
