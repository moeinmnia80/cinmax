import { getBroadcastOptions } from "@/data/broadcast";
import { BroadcastForm } from "@/features/broadcast/BroadcastForm";

export default async function NewBroadcastPage() {
  return <BroadcastForm {...await getBroadcastOptions()} />;
}
