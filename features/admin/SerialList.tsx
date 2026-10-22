import { use } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

import { DashboardSerial } from "@/data/dashboard";

export const SerialList = ({ data }: { data: Promise<DashboardSerial[]> }) => {
  const serials = use(data);
  return (
    <section
      className="bg-foreground/5 rounded-md border border-foreground/10 animate-scale-in"
      aria-labelledby="serials"
    >
      <div className="flex items-center justify-between px-4 py-5 border-b border-foreground/10">
        <h2 id="serials" className="uppercase">
          serials
        </h2>
        <p className="text-foreground/20 tracking-widest">Last 5 serials</p>
      </div>
      <div className="flex flex-col gap-4 px-4 py-5">
        {serials.length ? (
          serials.map((serial) => (
            <div key={serial.id} className="flex gap-4">
              <div className="max-w-16 aspect-3/4 rounded-sm overflow-hidden">
                <Image
                  src={serial.image}
                  alt={`${serial.title}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="flex justify-between w-full">
                <div>
                  <h3>{serial.title}</h3>
                  <p className="text-foreground/20">{serial.badge}</p>
                  <p>{serial.createdAt.toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col">
                  <span className="flex justify-center items-center h-fit gap-2">
                    <Star
                      size={15}
                      className="text-yellow-500 fill-yellow-500"
                    />
                    {serial.rating.toFixed(1)}
                  </span>
                  <span className="text-foreground/20">{serial.status}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <span className="text-foreground/20 self-center">
            there is no serials in db
          </span>
        )}
      </div>
    </section>
  );
};
