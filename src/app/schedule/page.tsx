"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import scheduleData from "@/data/schedule.json";
import EventCard from "@/components/EventCard";

function getDefaultDayIndex(): number {
  const today = new Date().toISOString().slice(0, 10);
  const idx = scheduleData.days.findIndex((d) => d.date === today);
  return idx >= 0 ? idx : 0;
}

function formatDateLabel(date: string, dow: string): string {
  const [, m, d] = date.split("-");
  return `${parseInt(m)}/${parseInt(d)}(${dow})`;
}

export default function SchedulePage() {
  const [selectedIdx, setSelectedIdx] = useState(getDefaultDayIndex);
  const tabsRef = useRef<HTMLDivElement>(null);

  const day = scheduleData.days[selectedIdx];
  const eventCount = day.events.length;

  useEffect(() => {
    const el = tabsRef.current?.children[selectedIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selectedIdx]);

  const dateStr = useMemo(() => {
    const [, m, d] = day.date.split("-");
    const dowMap: Record<string, string> = {
      Mon: "月", Tue: "火", Wed: "水", Thu: "木", Fri: "金", Sat: "土", Sun: "日",
    };
    return `${parseInt(m)}月${parseInt(d)}日（${dowMap[day.dayOfWeek] ?? day.dayOfWeek}）`;
  }, [day]);

  return (
    <div>
      {/* Date tabs */}
      <div
        ref={tabsRef}
        className="flex overflow-x-auto hide-scrollbar bg-bg-secondary border-b border-border-default sticky top-[52px] z-40"
      >
        {scheduleData.days.map((d, i) => {
          const active = i === selectedIdx;
          return (
            <button
              key={d.date}
              onClick={() => setSelectedIdx(i)}
              className={`shrink-0 px-3 py-2.5 text-xs whitespace-nowrap transition-colors ${
                active
                  ? "bg-blue-900 text-white font-medium"
                  : "text-text-muted hover:bg-bg-tertiary"
              }`}
            >
              {formatDateLabel(d.date, d.dayOfWeek)}
            </button>
          );
        })}
      </div>

      {/* Event count */}
      <div className="px-4 py-2 text-xs text-text-muted">
        {dateStr} — {eventCount} events
      </div>

      {/* Event list */}
      <div className="px-4 pb-6 space-y-3">
        {day.events.map((evt, i) => (
          <EventCard key={`${evt.id}-${i}`} event={evt} />
        ))}
      </div>
    </div>
  );
}
