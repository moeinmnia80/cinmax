import type { ComponentType } from "react";

type EditFormLoaderProps<K extends string, TData> = {
  searchParams: Promise<{ edit?: string }>;
  fetcher: (edit?: string) => Promise<TData>;
  dataProp: K;
  Form: ComponentType<{ edit?: string } & Record<K, TData>>;
};

export async function EditFormLoader<K extends string, TData>({
  searchParams,
  fetcher,
  dataProp,
  Form,
}: EditFormLoaderProps<K, TData>) {
  const { edit } = await searchParams;
  const data = await fetcher(edit);

  const formProps = { edit, [dataProp]: data } as { edit?: string } & Record<
    K,
    TData
  >;

  return (
    <>
      <p className="text-sm uppercase text-foreground/30">
        {edit || "unsaved draft"}
      </p>
      <Form {...formProps} />
    </>
  );
}
