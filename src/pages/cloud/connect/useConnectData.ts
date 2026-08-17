import { useCallback, useEffect, useState } from "react";
import type { ConnectMode, Result } from "./api";

/**
 * Small fetch-state helper for the Cloud Connect console.
 * Every loader returns { data, mode } so pages can show a demo notice
 * when the standalone Rust backend isn't configured.
 */
export function useAsyncData<T>(loader: () => Promise<Result<T>>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [mode, setMode] = useState<ConnectMode>("demo");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await loader();
      setData(res.data);
      setMode(res.mode);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { data, setData, mode, loading, error, refresh: run };
}