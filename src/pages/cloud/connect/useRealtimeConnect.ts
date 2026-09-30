import { useCallback, useEffect, useRef, useState } from "react";
import { getSessionToken, getStreamBase } from "./api";
import type { ActivityItem, Metric } from "./api";

export interface RealtimeMetrics {
  metrics: Metric[];
  activity: ActivityItem[];
}

type StreamState =
  | { status: "idle" }
  | { status: "connecting" }
  | { status: "live" }
  | { status: "error"; message: string }
  | { status: "offline" };

/**
 * Persistent WebSocket to the console backend's `/api/v1/stream?channel=metrics`.
 *
 * The gateway re-pushes the agent's console metrics every `GATEWAY_STREAM_INTERVAL_MS`
 * (2s) over a single long-lived connection, so the dashboard stays live with
 * minimal load — one socket per tab, no per-second HTTP polling. Reconnects
 * with backoff so toggling Wi-Fi on the phone just resumes the stream.
 *
 * Returns null (and stays idle) when no session token is set yet.
 */
export function useRealtimeMetrics(enabled: boolean) {
  const [frame, setFrame] = useState<RealtimeMetrics | null>(null);
  const [stream, setStream] = useState<StreamState>({ status: "idle" });
  const wsRef = useRef<WebSocket | null>(null);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const connect = useCallback(() => {
    wsRef.current?.close();
    const token = getSessionToken();
    if (!enabledRef.current || !token) {
      setStream({ status: "idle" });
      setFrame(null);
      return;
    }

    const url = `${getStreamBase()}/api/v1/stream?channel=metrics&token=${encodeURIComponent(
      token
    )}`;

    setStream({ status: "connecting" });
    let closed = false;
    let attempt = 0;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      attempt = 0;
      setStream({ status: "live" });
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data as string);
        if (msg?.type === "update" && msg?.data && typeof msg.data === "object") {
          setFrame({ metrics: msg.data.metrics ?? [], activity: msg.data.activity ?? [] });
        }
      } catch {
        // ignore malformed frames
      }
    };

    ws.onclose = () => {
      if (closed) return;
      if (!enabledRef.current) return;
      // Exponential backoff: 750ms, 1.5s, 3s, ..., capped at 30s.
      attempt += 1;
      const backoff = Math.min(750 * 2 ** (attempt - 1), 30_000);
      setStream({ status: "offline" });
      setTimeout(() => {
        if (enabledRef.current) connect();
      }, backoff);
    };

    ws.onerror = () => {
      ws.close();
    };

    return () => {
      closed = true;
      ws.close();
    };
  }, []);

  useEffect(() => connect(), [connect]);

  useEffect(() => {
    return () => {
      wsRef.current?.close();
    };
  }, []);

  return { frame, stream };
}