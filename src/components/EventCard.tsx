"use client";

import { useState } from "react";

interface Event {
  id: string;
  name: string;
  startTime: string;
  closeTime: string | null;
  chips: number | null;
  entry: string;
  isMainEvent: boolean;
  isSatellite: boolean;
}

export default function EventCard({ event }: { event: Event }) {
  const [open, setOpen] = useState(false);

  const borderColor = event.isMainEvent
    ? "border-l-blue-700"
    : "border-l-blue-100";

  const bgColor = event.isMainEvent ? "bg-blue-50" : "bg-white";

  return (
    <div
      className={`border border-border-default rounded-lg overflow-hidden border-l-[3px] ${borderColor} ${bgColor}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-3"
      >
        {event.isMainEvent && (
          <span className="inline-block bg-blue-700 text-white text-[9px] font-bold px-2 py-0.5 rounded mb-1.5 uppercase tracking-wider">
            MAIN EVENT
          </span>
        )}
        {event.isSatellite && (
          <span className="inline-block bg-blue-100 text-blue-900 text-[9px] font-bold px-2 py-0.5 rounded mb-1.5 uppercase tracking-wider">
            SATELLITE
          </span>
        )}

        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] text-text-muted mb-0.5">
              #{event.id}
            </p>
            <p className="text-sm font-medium text-text-primary leading-tight truncate">
              {event.name}
            </p>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#888"
            strokeWidth="2"
            className={`shrink-0 mt-1 transition-transform ${open ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
          <span>
            {event.startTime}
            {event.closeTime ? ` – ${event.closeTime}` : ""}
          </span>
          {event.chips && (
            <span className="text-text-muted">
              {event.chips.toLocaleString()} chips
            </span>
          )}
        </div>

        <p className="text-xs text-blue-900 font-medium mt-1">
          {event.entry}
        </p>
      </button>

      {open && (
        <div className="border-t border-border-default px-3 py-3 bg-bg-secondary">
          <p className="text-[10px] font-bold tracking-[1px] text-blue-900 uppercase mb-2">
            INFO
          </p>
          <div className="space-y-1 text-xs text-text-secondary">
            <div className="flex justify-between">
              <span>Entry</span>
              <span className="font-medium text-text-primary">{event.entry}</span>
            </div>
            {event.chips && (
              <div className="flex justify-between">
                <span>Chips</span>
                <span className="font-medium text-text-primary">
                  {event.chips.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Start</span>
              <span className="font-medium text-text-primary">{event.startTime}</span>
            </div>
            {event.closeTime && (
              <div className="flex justify-between">
                <span>Reg Close</span>
                <span className="font-medium text-text-primary">{event.closeTime}</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="mt-3 text-[10px] text-text-muted flex items-center gap-1 mx-auto"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            タップで閉じる
          </button>
        </div>
      )}
    </div>
  );
}
