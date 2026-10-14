"use client";

import { Trash2 } from "lucide-react";

interface SerialActionsProps {
  serialId: number;
  slug: string;
}

export const SerialActions = ({ serialId }: SerialActionsProps) => {
  const handleEdit = () => {
    console.log("Edit serial:", serialId);
  };

  const handleDelete = () => {
    console.log("Delete serial:", serialId);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleEdit}
        className="px-2 py-1 text-xs bg-gray-200/10 text-gray-200 rounded hover:bg-gray-200/20 transition uppercase"
      >
        Edit
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
