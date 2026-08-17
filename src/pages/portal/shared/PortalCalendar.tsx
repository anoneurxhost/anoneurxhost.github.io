import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, MapPin, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePortal } from "../PortalContext";
import { PageHeader, PortalPage, PortalSection, ModuleBadge } from "../components/ui";

const typeIconStyle: Record<string, string> = {
  class: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  assignment: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  meeting: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  deadline: "bg-red-500/20 text-red-300 border-red-500/30",
  event: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  submission: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getMonthGrid = (year: number, month: number) => {
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
};

export const PortalCalendar = () => {
  const { data } = usePortal();
  const now = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date>(now);

  const monthEvents = useMemo(() => {
    const map = new Map<string, typeof data.events>();
    data.events.forEach((event) => {
      const key = event.date;
      map.set(key, [...(map.get(key) ?? []), event]);
    });
    return map;
  }, [data]);

  const grid = useMemo(
    () => getMonthGrid(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  );

  const selectedKey = selectedDate.toISOString().slice(0, 10);
  const selectedEvents = monthEvents.get(selectedKey) ?? [];

  const upcoming = useMemo(
    () =>
      [...data.events]
        .sort((a, b) => a.date.localeCompare(b.date))
        .filter((e) => e.date >= now.toISOString().slice(0, 10)),
    [data.events, now]
  );

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const moveMonth = (dir: number) =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + dir, 1));

  return (
    <PortalPage>
      <PageHeader
        eyebrow="Integrated Schedule"
        title="Calendar"
        description="Every class, assignment, meeting, deadline and submission across all your programs in one view."
        icon={CalendarDays}
        gradient="from-purple-500 to-fuchsia-500"
        actions={
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" /> Add Event
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <PortalSection className="lg:col-span-2">
          <Card className="glass-dark border-white/10">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">
                  {viewDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
                </h2>
                <div className="flex gap-1.5">
                  <Button variant="outline" size="sm" onClick={() => moveMonth(-1)} className="border-white/10 h-8 w-8 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewDate(new Date(now.getFullYear(), now.getMonth(), 1))}
                    className="border-white/10 text-slate-300 h-8"
                  >
                    Today
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => moveMonth(1)} className="border-white/10 h-8 w-8 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {WEEKDAYS.map((day) => (
                  <div key={day} className="text-center text-xs font-semibold text-slate-500 py-2">
                    {day}
                  </div>
                ))}
                {grid.map((date, i) => {
                  if (!date)
                    return <div key={`empty-${i}`} className="aspect-square" />;
                  const key = date.toISOString().slice(0, 10);
                  const hasEvents = monthEvents.has(key);
                  const isToday = isSameDay(date, now);
                  const isSelected = isSameDay(date, selectedDate);
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedDate(date)}
                      className={cn(
                        "aspect-square rounded-xl border text-sm font-medium transition-all flex flex-col items-center justify-center",
                        isSelected
                          ? "bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white border-transparent shadow-lg"
                          : isToday
                            ? "border-purple-500/50 bg-purple-500/10 text-white"
                            : "border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/5"
                      )}
                    >
                      {date.getDate()}
                      {hasEvents && (
                        <span
                          className={cn(
                            "mt-1 flex gap-0.5",
                            isSelected ? "bg-white/80" : "bg-purple-400"
                          )}
                        >
                          <span className={cn("h-1 w-1 rounded-full", isSelected ? "bg-white" : "bg-purple-400")} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </PortalSection>

        {/* Selected day events */}
        <PortalSection>
          <Card className="glass-dark border-white/10">
            <CardContent className="p-5">
              <h3 className="font-bold text-white">
                {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </h3>
              <div className="mt-4 space-y-2">
                {selectedEvents.length === 0 && (
                  <p className="text-sm text-slate-500">No events scheduled for this day.</p>
                )}
                {selectedEvents.map((event) => (
                  <div key={event.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-white">{event.title}</p>
                      <Badge className={typeIconStyle[event.type]}>{event.type}</Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {event.time}</span>
                      {event.location && (
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>
                      )}
                    </div>
                    <div className="mt-2">
                      <ModuleBadge module={event.module} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </PortalSection>
      </div>

      {/* Upcoming */}
      <PortalSection>
        <Card className="glass-dark border-white/10">
          <CardContent className="p-5">
            <h3 className="font-bold text-white mb-3">Upcoming</h3>
            <div className="space-y-2">
              {upcoming.slice(0, 6).map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                >
                  <div className="text-center w-11 shrink-0">
                    <p className="text-base font-bold text-white leading-none">{new Date(event.date).getDate()}</p>
                    <p className="text-[10px] uppercase text-slate-500">
                      {new Date(event.date).toLocaleString("en-US", { month: "short" })}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{event.title}</p>
                    <p className="text-xs text-slate-500">{event.time}{event.location ? ` · ${event.location}` : ""}</p>
                  </div>
                  <ModuleBadge module={event.module} />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </PortalSection>
    </PortalPage>
  );
};

export default PortalCalendar;
