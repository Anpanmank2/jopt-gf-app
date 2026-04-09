import galleryData from "@/data/gallery.json";

export default function GalleryPage() {
  return (
    <div className="px-4 py-6 space-y-6">
      {/* Top CTA */}
      <a
        href="https://www.flickr.com/photos/190979093@N07/albums/"
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
          const isLatest = "isLatest" in evt && evt.isLatest;
          const flickrUrl =
            evt.companionAlbumId && evt.companionAlbumId !== "TODO"
              ? `https://www.flickr.com/photos/190979093@N07/albums/with/${evt.companionAlbumId}`
              : `https://www.flickr.com/photos/190979093@N07/albums/${evt.stuffAlbumId}`;

          return (
            <a
              key={i}
              href={flickrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-border-default rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Thumbnail placeholder */}
              <div className="bg-bg-tertiary h-36 flex items-center justify-center relative">
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

              {/* Card info */}
              <div className="p-3">
                {isLatest && (
                  <span className="inline-block bg-blue-700 text-white text-[9px] font-bold px-2 py-0.5 rounded mb-1.5 uppercase tracking-wider">
                    LATEST
                  </span>
                )}
                <p className="text-sm font-medium text-text-primary">
                  {evt.eventName}
                </p>
                <p className="text-xs text-text-muted mt-0.5">{evt.period}</p>
                <p className="text-xs text-blue-900 font-medium mt-2">
                  Flickr アルバムを見る →
                </p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <a
        href="https://www.flickr.com/photos/190979093@N07/albums/"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-blue-50 border border-blue-100 rounded-lg p-4 text-center"
      >
        <p className="text-sm font-medium text-blue-900">
          過去のイベントを見る →
        </p>
      </a>
    </div>
  );
}
