"use client";

import { useState, useEffect } from "react";

const CHANNEL_URL = "https://youtube.com/@japanopenpokertour";

function YouTubeIcon() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
      <rect width="28" height="20" rx="4" fill="#FF0000" />
      <path d="M11 5.5L19 10L11 14.5V5.5Z" fill="white" />
    </svg>
  );
}

export default function YouTubeLink() {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchThumbnail() {
      try {
        const res = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(
            CHANNEL_URL
          )}&format=json`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.thumbnail_url) {
            setThumbnailUrl(data.thumbnail_url);
            return;
          }
        }
      } catch {
        // silent fallback
      }
    }
    fetchThumbnail();
  }, []);

  return (
    <section>
      <h3 className="text-xs font-bold tracking-[2px] text-blue-900 uppercase mb-3">
        JOPT OFFICIAL YOUTUBE
      </h3>
      <a
        href={CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block border border-border-default rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
      >
        {/* Thumbnail */}
        <div className="relative w-full aspect-video bg-blue-50">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt="JOPT Official YouTube"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <YouTubeIcon />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-center gap-3 p-3">
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

        {/* CTA */}
        <div className="px-3 pb-3">
          <span className="text-xs font-medium text-blue-700">
            配信はこちらから →
          </span>
        </div>
      </a>
    </section>
  );
}
