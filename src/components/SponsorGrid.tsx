import sponsors from "@/data/sponsors.json";

export default function SponsorGrid() {
  return (
    <section>
      <h3 className="text-xs font-bold tracking-[2px] text-blue-900 uppercase mb-3">
        SPONSORS / PARTNERS
      </h3>
      <div className="flex flex-wrap gap-2">
        {sponsors.map((s) => {
          const inner = (
            <span className="inline-block bg-blue-50 text-blue-900 text-[11px] font-medium px-3 py-1.5 rounded-md">
              {s.name}
            </span>
          );
          return s.url ? (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
              {inner}
            </a>
          ) : (
            <span key={s.name}>{inner}</span>
          );
        })}
      </div>
    </section>
  );
}
