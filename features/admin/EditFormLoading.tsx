import { getSerial } from "@/data/serial";
import { EditForm } from "@/features/client";

export const EditFormLoading = async ({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) => {
  const { edit } = await searchParams;
  const serial = await getSerial(edit);

  return <EditForm edit={edit} serial={serial} />;
};
