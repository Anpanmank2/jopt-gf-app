"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import bannersData from "@/data/banners.json";

const banners = bannersData.filter((b) => b.active);

export default function PromoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  const goTo = useCallback((index: number) => {
    setCurrentIndex((index + banners.length) % banners.length);
  }, []);

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }

  function handleTouchEnd() {
    if (Math.abs(touchDeltaX.current) > 40) {
      touchDeltaX.current < 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  }

  if (banners.length === 0) return null;

  const banner = banners[currentIndex];
  const isExternal = banner.url.startsWith("http");

  const inner = (
    <div
      className="relative w-full aspect-video bg-blue-100 flex items-center justify-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={banner.image}
        alt={banner.alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      <span className="absolute text-blue-900 text-sm font-medium text-center px-4">
        {banner.alt}
      </span>

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === currentIndex ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full rounded-lg overflow-hidden">
      {isExternal ? (
        <a href={banner.url} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        <Link href={banner.url}>{inner}</Link>
      )}
    </div>
  );
}
