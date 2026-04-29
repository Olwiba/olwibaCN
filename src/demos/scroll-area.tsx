"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";
import { ScrollArea } from "@/components/ui/scroll-area";

type ScrollAxis = "vertical" | "both";

type LogLevel = "INFO" | "DEBUG" | "WARN" | "ERROR";

const logs: { time: string; level: LogLevel; msg: string }[] = [
  { time: "10:23:01", level: "INFO",  msg: "Application starting in production mode — Node.js v20.11.0, 8 CPUs, 16 GB RAM, config loaded from /etc/app/production.env" },
  { time: "10:23:02", level: "INFO",  msg: "Database connection established: postgres://db.cluster.us-east-1.rds.amazonaws.com:5432/app_prod?sslmode=verify-full&pool_size=20" },
  { time: "10:23:02", level: "DEBUG", msg: "Running 14 pending migrations: 0041_add_user_roles, 0042_create_audit_log, 0043_index_events_created_at, 0044_drop_legacy_sessions" },
  { time: "10:23:03", level: "INFO",  msg: "All migrations applied successfully — database schema is up to date and all foreign key constraints verified" },
  { time: "10:23:04", level: "INFO",  msg: "Route registry complete: 86 handlers loaded from src/routes, 12 middleware chains registered, CORS origins: [app.example.com, admin.example.com]" },
  { time: "10:23:05", level: "INFO",  msg: "Static asset pipeline ready — /public served with 1y cache headers, 4 bundles pre-compressed (gzip + brotli)" },
  { time: "10:23:06", level: "WARN",  msg: "Environment variable RATE_LIMIT_MAX not set — falling back to default of 100 req/min per IP; consider setting this explicitly in production" },
  { time: "10:23:07", level: "INFO",  msg: "TLS certificate valid until 2025-12-01, auto-renewal scheduled 30 days before expiry via Let's Encrypt ACME challenge" },
  { time: "10:23:08", level: "INFO",  msg: "Server listening on https://0.0.0.0:3000 — ready to accept connections" },
  { time: "10:23:11", level: "INFO",  msg: "GET /api/health 200 OK (2ms) — all subsystems nominal: db ✓, cache ✓, queue ✓, storage ✓" },
  { time: "10:23:15", level: "INFO",  msg: "GET /api/users?page=1&limit=20&sort=created_at&order=desc 200 OK (34ms) — returned 20 of 1,842 records" },
  { time: "10:23:18", level: "DEBUG", msg: "Cache miss for key users:list:p1:desc — fetching from primary db, result will be cached for 60s with tag invalidation on user write" },
  { time: "10:23:25", level: "WARN",  msg: "Slow query detected (320ms): SELECT * FROM events WHERE created_at > now() - interval '7 days' AND user_id = ANY($1) ORDER BY created_at DESC" },
  { time: "10:23:30", level: "ERROR", msg: "Failed to deliver welcome email to new@example.com — SMTP error 535: authentication failed (attempt 1/3, next retry in 30s)" },
  { time: "10:23:31", level: "INFO",  msg: "Background job enqueued: send_welcome_email{user_id: 9182, email: new@example.com, template: onboarding_v3, priority: high}" },
];

const levelClass: Record<LogLevel, string> = {
  INFO:  "text-blue-500",
  DEBUG: "text-muted-foreground",
  WARN:  "text-yellow-500",
  ERROR: "text-destructive",
};

function getScrollAreaUsageCode({ axis }: { axis: ScrollAxis }) {
  if (axis === "both") {
    return `<ScrollArea scrollbars="both" className="h-64 w-full rounded-md border font-mono text-sm">
  <div className="whitespace-nowrap p-4">
    {logs.map((log, i) => (
      <div key={i} className="flex gap-6 py-1">
        <span className="shrink-0 text-muted-foreground">{log.time}</span>
        <span className="w-14 shrink-0">{log.level}</span>
        <span>{log.msg}</span>
      </div>
    ))}
  </div>
</ScrollArea>`;
  }

  return `<ScrollArea className="h-64 w-full rounded-md border font-mono text-sm">
  <div className="overflow-x-hidden p-4">
    {logs.map((log, i) => (
      <div key={i} className="flex gap-6 py-1">
        <span className="shrink-0 text-muted-foreground">{log.time}</span>
        <span className="w-14 shrink-0">{log.level}</span>
        <span className="min-w-0 truncate">{log.msg}</span>
      </div>
    ))}
  </div>
</ScrollArea>`;
}

export default function ScrollAreaDemo() {
  const [axis, setAxis] = useState<ScrollAxis>("vertical");

  useUsageCode(getScrollAreaUsageCode({ axis }));

  return (
    <>
      {axis === "both" ? (
        <ScrollArea scrollbars="both" className="h-64 w-full rounded-md border font-mono text-sm">
          <div className="whitespace-nowrap p-4">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-6 py-1">
                <span className="shrink-0 text-muted-foreground">{log.time}</span>
                <span className={`w-14 shrink-0 ${levelClass[log.level]}`}>{log.level}</span>
                <span>{log.msg}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <ScrollArea className="h-64 w-full rounded-md border font-mono text-sm">
          <div className="overflow-x-hidden p-4">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-6 py-1">
                <span className="shrink-0 text-muted-foreground">{log.time}</span>
                <span className={`w-14 shrink-0 ${levelClass[log.level]}`}>{log.level}</span>
                <span className="min-w-0 truncate">{log.msg}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Scrollbars</span>
            <div className="flex gap-1.5">
              {(["vertical", "both"] as ScrollAxis[]).map((value) => (
                <Button key={value} variant={axis === value ? "default" : "secondary"} size="sm" onClick={() => setAxis(value)}>
                  {value === "both" ? "Both" : "Vertical"}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
