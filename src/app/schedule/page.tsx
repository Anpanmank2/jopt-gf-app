"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import scheduleData from "@/data/jopt_gf2026_data.json";
import EventCard from "@/components/EventCard";

type GameFilter = "All" | "NLH" | "PLO" | "MIX" | "SAT";

const FILTERS: GameFilter[] = ["All", "NLH", "PLO", "MIX", "SAT"];

function getDefaultDayIndex(): number {
  const today = new Date().toISOString().slice(0, 10);
  const idx = scheduleData.days.findIndex((d) => d.date === today);
  return idx >= 0 ? idx : 0;
}

export default function SchedulePage() {
  const [selectedIdx, setSelectedIdx] = useState(getDefaultDayIndex);
  const [filter, setFilter] = useState<GameFilter>("All");
  const tabsRef = useRef<HTMLDivElement>(null);

  const day = scheduleData.days[selectedIdx];

  useEffect(() => {
    const el = tabsRef.current?.children[selectedIdx] as
      | HTMLElement
      | undefined;
    el?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [selectedIdx]);

  const filteredEvents = useMemo(() => {
    if (filter === "All") return day.events;
    return day.events.filter((e) => e.gameType === filter);
  }, [day, filter]);

  const totalCount = day.events.length;
  const filteredCount = filteredEvents.length;

  return (
    <div>
      {/* Date tabs — sticky below header */}
      <div
        ref={tabsRef}
        className="flex overflow-x-auto hide-scrollbar bg-bg-secondary border-b border-border-default sticky top-[52px] z-40"
      >
        {scheduleData.days.map((d, i) => {
          const active = i === selectedIdx;
          return (
            <button
              key={d.date}
              onClick={() => {
                setSelectedIdx(i);
                setFilter("All");
              }}
              className={`shrink-0 px-3 py-2.5 text-xs whitespace-nowrap transition-colors ${
                active
                  ? "bg-blue-900 text-white font-medium"
                  : "text-text-muted hover:bg-bg-tertiary"
              }`}
            >
              {d.dayLabel}
            </button>
          );
        })}
      </div>

      {/* Game type filter */}
      <div className="flex gap-1.5 px-4 pt-3 pb-1 overflow-x-auto hide-scrollbar">
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-3 py-1.5 text-[11px] font-medium rounded-full border transition-colors ${
                active
                  ? "bg-blue-900 text-white border-blue-900"
                  : "bg-white text-text-secondary border-border-default hover:bg-bg-secondary"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Event count */}
      <div className="px-4 py-2 text-xs text-text-muted">
        {filter === "All" ? (
          <span>{totalCount} events</span>
        ) : (
          <span>
            Filtered: {filter} — {filteredCount} events
          </span>
        )}
      </div>

      {/* Event list */}
      <div className="px-4 pb-6 space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 text-sm text-text-muted">
            No events found
          </div>
        ) : (
          filteredEvents.map((evt, i) => (
            <EventCard key={`${evt.eventNumber}-${evt.startTime}-${i}`} event={evt} />
          ))
        )}
      </div>
    </div>
  );
}
