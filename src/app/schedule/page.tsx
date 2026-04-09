"use client";

import { useState, useRef, useEffect } from "react";
import rawData from "@/data/jopt_gf2026_data.json";
import EventCard from "@/components/EventCard";
import { useEventFilter } from "@/hooks/useEventFilter";
import EventFilter from "@/components/EventFilter";

// Regroup events: 00:00-08:59 start times belong to previous day
interface EventItem {
  eventNumber: string;
  name: string;
  gameType: string;
  date: string;
  startTime: string;
  lateRegClose: string | null;
  lateRegLevel: number | null;
  startingChips: number | null;
  buyIn: number | null;
  buyInDisplay: string | null;
  gtd: number | null;
  gtdDisplay: string | null;
  isMainEvent: boolean;
  isSatellite: boolean;
  reentry: string;
  day2Condition: string | null;
  ruleNotes: string | null;
  structure: unknown;
}

interface DayGroup {
  date: string;
  dayLabel: string;
  events: EventItem[];
}

function buildDayGroups(): DayGroup[] {
  // Collect all unique dates from the raw data to preserve day order
  const dateLabels: Record<string, string> = {};
  for (const day of rawData.days) {
    dateLabels[day.date] = day.dayLabel;
  }

  // Build map: date -> events (regrouping late-night events to previous day)
  const grouped: Record<string, EventItem[]> = {};

  // Initialize with all original dates (preserves order even if empty after regroup)
  for (const day of rawData.days) {
    grouped[day.date] = [];
  }

  for (const day of rawData.days) {
    for (const evt of day.events) {
      const hour = parseInt(evt.startTime.split(":")[0], 10);
      let targetDate = evt.date;

      if (hour < 9) {
        // Belongs to previous day
        const d = new Date(evt.date + "T00:00:00");
        d.setDate(d.getDate() - 1);
        const prevDate = d.toISOString().slice(0, 10);
        // Only regroup if previous date exists in our data
        if (grouped[prevDate] !== undefined) {
          targetDate = prevDate;
        }
      }

      if (!grouped[targetDate]) {
        grouped[targetDate] = [];
      }
      grouped[targetDate].push(evt as unknown as EventItem);
    }
  }

  // Sort events within each day by startTime
  // For regrouped events, late-night (00:00-08:59) should come AFTER daytime events
  for (const date of Object.keys(grouped)) {
    grouped[date].sort((a, b) => {
      const ha = parseInt(a.startTime.split(":")[0], 10);
      const hb = parseInt(b.startTime.split(":")[0], 10);
      // Treat 00-08 as 24-32 for sorting
      const sortA = ha < 9 ? ha + 24 : ha;
      const sortB = hb < 9 ? hb + 24 : hb;
      if (sortA !== sortB) return sortA - sortB;
      return a.startTime.localeCompare(b.startTime);
    });
  }

  // Build ordered array
  return rawData.days
    .map((day) => ({
      date: day.date,
      dayLabel: day.dayLabel,
      events: grouped[day.date] || [],
    }))
    .filter((d) => d.events.length > 0);
}

const dayGroups = buildDayGroups();

function getDefaultDayIndex(): number {
  const today = new Date().toISOString().slice(0, 10);
  const idx = dayGroups.findIndex((d) => d.date === today);
  return idx >= 0 ? idx : 0;
}

export default function SchedulePage() {
  const [selectedIdx, setSelectedIdx] = useState(getDefaultDayIndex);
  const tabsRef = useRef<HTMLDivElement>(null);

  const day = dayGroups[selectedIdx];

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

  const { filteredEvents, activeFilters, setFilter, filterSummary } = useEventFilter(
    day.events as Record<string, any>[]
  );

  return (
    <div>
      {/* Date tabs — sticky below header */}
      <div
        ref={tabsRef}
        className="flex overflow-x-auto hide-scrollbar bg-bg-secondary border-b border-border-default sticky top-[52px] z-40"
      >
        {dayGroups.map((d, i) => {
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
              {d.dayLabel}
            </button>
          );
        })}
      </div>

      {/* Config-driven filter */}
      <EventFilter activeFilters={activeFilters} onFilterChange={setFilter} />

      {/* Event count */}
      <div className="px-4 py-2 text-xs text-text-muted">{filterSummary}</div>

      {/* Event list */}
      <div className="px-4 pb-6 space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 text-sm text-text-muted">
            No events found
          </div>
        ) : (
          filteredEvents.map((evt, i) => (
            <EventCard
              key={`${evt.eventNumber}-${evt.startTime}-${i}`}
              event={evt as any}
            />
          ))
        )}
      </div>
    </div>
  );
}
