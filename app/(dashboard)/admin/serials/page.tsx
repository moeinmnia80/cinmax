import { Suspense } from "react";

import { AdminHeader } from "@/features/admin/AdminHeader";
import { AdminCardSkeleton } from "@/features/admin/AdminCardSkeleton";
import { getSerialCards } from "@/constants/serialCards";
import { AdminCard } from "@/features/admin/AdminCard";

const SerialsPage = () => {
  return (
    <div>
      <AdminHeader title="Serials" desc="Library / Series" />
      <Suspense fallback={<AdminCardSkeleton />}>
        <AdminCard fetchCards={getSerialCards} />
      </Suspense>
      <div className="px-4 py-5">
        <div className="w-full min-h-12 bg-foreground/5 rounded-md border border-foreground/10">
          <h2 className="p-3 border-b border-foreground/10">All serial</h2>
        </div>
      </div>
    </div>
  );
};

export default SerialsPage;
