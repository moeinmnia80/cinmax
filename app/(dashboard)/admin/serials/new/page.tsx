import { getSerialFormOptions } from "../actions";
import { SerialForm } from "../_components/SerialForm";

export default async function NewSerialPage() {
  const options = await getSerialFormOptions();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-wide">
          New serial
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Fill in the details below. Cast, per-episode data and gallery images
          aren&#39;t managed here yet.
        </p>
      </div>

      <SerialForm options={options} />
    </div>
  );
}
