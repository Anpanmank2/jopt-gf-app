import galleryData from "@/data/gallery.json";

const FLICKR_BASE = "https://www.flickr.com/photos/190979093@N07/albums/";

export default function GalleryPage() {
  return (
    <div className="px-4 py-6 space-y-6">
      {/* Section title */}
      <h2 className="text-xs font-bold tracking-[2px] text-blue-900 uppercase">
        GALLERY
      </h2>

      {/* Top CTA */}
      <a
        href={FLICKR_BASE}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-blue-900 text-white rounded-lg p-4 text-center"
      >
        <p className="text-sm font-medium">JOPT 公式 Flickr アルバム →</p>
        <p className="text-xs text-white/60 mt-1">
          全イベントの写真をまとめて閲覧
        </p>
      </a>

      {/* Event cards */}
      <div className="space-y-4">
        {galleryData.map((evt, i) => {
          const isLatest = evt.isLatest === true;
          const cardBorder = isLatest
            ? "border-[1.5px] border-blue-700"
            : "border border-border-default";

          return (
            <a
              key={i}
              href={evt.flickrLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`block ${cardBorder} rounded-lg overflow-hidden hover:shadow-md transition-shadow`}
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-video bg-bg-tertiary">
                {evt.thumbnailUrl ? (
                  <img
                    src={evt.thumbnailUrl}
                    alt={evt.eventName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-text-muted">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="mx-auto mb-1 opacity-40"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <span className="text-[10px]">Flickr Album</span>
                    </div>
                  </div>
                )}
                {/* LATEST badge */}
                {isLatest && (
                  <span className="absolute top-2 right-2 bg-blue-700 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    LATEST
                  </span>
                )}
              </div>

              {/* Card info */}
              <div className="p-3">
                <p className="text-sm font-medium text-text-primary">
                  {evt.eventName}
                </p>
                <p className="text-xs text-text-muted mt-0.5">{evt.period}</p>
                <p className="text-xs text-blue-700 font-medium mt-2">
                  Flickr アルバムを見る →
                </p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <a
        href={FLICKR_BASE}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-blue-50 border border-blue-100 rounded-lg p-4 text-center"
      >
        <p className="text-sm font-medium text-blue-900">
          過去のイベントも見る →
        </p>
      </a>
    </div>
  );
}
