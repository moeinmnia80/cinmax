// app/admin/broadcasts/[id]/page.tsx
import { notFound } from "next/navigation";
import { BroadcastForm } from "@/features/broadcast/BroadcastForm";
import { getBroadcast, getBroadcastOptions } from "@/data/broadcast";

export default async function EditBroadcastPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [broadcast, options] = await Promise.all([
    getBroadcast(Number(id)),
    getBroadcastOptions(),
  ]);
  if (!broadcast) notFound();

  return (
    <BroadcastForm key={broadcast.id} {...options} broadcast={broadcast} />
  );
}
