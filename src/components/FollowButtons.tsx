const socials = [
  {
    name: "X",
    url: "https://x.com/japanopenpoker",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://instagram.com/japanopen",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" />
      </svg>
    ),
  },
  {
    name: "LINE",
    url: "https://lin.ee/8kCSr85",
    color: "#06C755",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#06C755">
        <path d="M12 2C6.48 2 2 5.82 2 10.5c0 2.95 1.94 5.55 4.84 7.1l-.96 3.53c-.06.22.18.4.38.28L10.26 19c.57.07 1.15.11 1.74.11 5.52 0 10-3.82 10-8.5S17.52 2 12 2z" />
      </svg>
    ),
  },
];

export default function FollowButtons() {
  return (
    <section>
      <h3 className="text-xs font-bold tracking-[2px] text-blue-900 uppercase mb-3">
        FOLLOW
      </h3>
      <div className="flex gap-3">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 border border-border-default rounded-lg text-text-primary hover:bg-bg-secondary transition-colors flex-1 justify-center"
          >
            <span style={s.color ? { color: s.color } : undefined}>
              {s.icon}
            </span>
            <span className="text-xs font-medium">{s.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
