"use client";
import { useState, useEffect } from "react";

const TARGET = new Date("2026-04-24T18:00:00+09:00");

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return null;
  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hrs = Math.floor((totalSec % 86400) / 3600);
  const min = Math.floor((totalSec % 3600) / 60);
  const sec = totalSec % 60;
  return { days, hrs, min, sec };
}

export default function HeroBanner() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative text-white text-center overflow-hidden">
      {/* Background image (will be replaced with video later) */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/70" />
      </div>

      {/* Content */}
      <div className="relative px-6 py-10">
        <p className="text-xs tracking-[4px] text-white/70 mb-2">
          2026.04.24 – 05.06
        </p>
        <h2 className="text-2xl font-bold mb-1">GRAND FINAL</h2>
        <p className="text-xs text-white/60 mb-1">Japan Open Poker Tour</p>
        <p className="text-[10px] text-white/50 mb-4 leading-relaxed">
          ベルサール高田馬場 / Bellesalle Takadanobaba, Shinjuku, Tokyo
        </p>
        <p className="text-sm italic text-white/85 mb-6">
          すべてのポーカーに、白熱を。
        </p>

        {timeLeft === null ? (
          <div className="inline-block px-6 py-2 bg-white/20 rounded-lg text-sm font-bold tracking-widest">
            NOW OPEN
          </div>
        ) : (
          <div className="flex justify-center gap-3">
            {[
              { value: timeLeft.days, label: "DAYS" },
              { value: timeLeft.hrs, label: "HRS" },
              { value: timeLeft.min, label: "MIN" },
              { value: timeLeft.sec, label: "SEC" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="bg-white/10 rounded px-3 py-2 min-w-[44px] text-center backdrop-blur-sm">
                  <span className="text-lg font-bold tabular-nums">
                    {String(value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[9px] text-white/50 mt-1 tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-900 via-blue-500 to-transparent" />
    </section>
  );
}
