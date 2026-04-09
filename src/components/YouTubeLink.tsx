"use client";

import { useState } from "react";

const CHANNEL_URL = "https://www.youtube.com/@JapanOpenPokerTour";
const EMBED_VIDEO_ID = "ajYjvqUr7CY";
const THUMBNAIL_URL = `https://i.ytimg.com/vi/${EMBED_VIDEO_ID}/hqdefault.jpg`;

function YouTubeIcon() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
      <rect width="28" height="20" rx="4" fill="#FF0000" />
      <path d="M11 5.5L19 10L11 14.5V5.5Z" fill="white" />
    </svg>
  );
}

export default function YouTubeLink() {
  const [playing, setPlaying] = useState(false);

  return (
    <section>
      <h3 className="text-xs font-bold tracking-[2px] text-blue-900 uppercase mb-3">
        JOPT OFFICIAL YOUTUBE
      </h3>

      {/* Embedded video player / thumbnail */}
      <div className="w-full rounded-lg overflow-hidden border border-border-default">
        <div className="relative w-full aspect-video bg-black">
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${EMBED_VIDEO_ID}?autoplay=1&rel=0`}
              title="JOPT Official Video"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="w-full h-full relative"
            >
              <img
                src={THUMBNAIL_URL}
                alt="JOPT Official YouTube"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-14 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Info bar */}
        <div className="flex items-center gap-3 p-3 bg-white">
          <div className="shrink-0">
            <YouTubeIcon />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-text-primary truncate">
              JOPT 公式 YouTube チャンネル
            </p>
            <p className="text-xs text-text-muted truncate">
              配信アーカイブ・スペシャルムービー
            </p>
          </div>
        </div>

        {/* CTA link to channel */}
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-3 pb-3 bg-white"
        >
          <span className="text-xs font-medium text-blue-700">
            配信はこちらから →
          </span>
        </a>
      </div>
    </section>
  );
}
