import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { setSessionToken } from "./api";

export type ConnectServer = {
  name: string;
  host: string;
  username: string;
  port: number;
  status: "online" | "offline" | "connecting";
  authMode?: "password" | "key";
  os?: string | null;
};

type Ctx = {
  authenticated: boolean;
  signIn: (identifier: string) => void;
  signOut: () => void;

  server: ConnectServer | null;
  connect: (s: Omit<ConnectServer, "status">, token?: string) => void;
  disconnect: () => void;

  userLabel: string;
};

const ConnectSessionContext = createContext<Ctx | null>(null);

/**
 * Cloud Connect session — in-memory only. Never persists passwords or
 * exposes server IDs; the active server lives here for the duration of the
 * authenticated tab.
 */
export const ConnectSessionProvider = ({ children }: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userLabel, setUserLabel] = useState("");
  const [server, setServer] = useState<ConnectServer | null>(null);

  const value = useMemo<Ctx>(
    () => ({
      authenticated,
      userLabel,
      signIn: (identifier: string) => {
        setAuthenticated(true);
        setUserLabel(identifier);
      },
      signOut: () => {
        setAuthenticated(false);
        setUserLabel("");
        setServer(null);
        setSessionToken(null);
      },
      server,
      connect: (s, token) => {
        if (token !== undefined) setSessionToken(token);
        setServer({ ...s, status: "online" });
      },
      disconnect: () => {
        setSessionToken(null);
        setServer(null);
      },
    }),
    [authenticated, userLabel, server]
  );

  return <ConnectSessionContext.Provider value={value}>{children}</ConnectSessionContext.Provider>;
};

export const useConnectSession = () => {
  const ctx = useContext(ConnectSessionContext);
  if (!ctx) throw new Error("useConnectSession must be used within ConnectSessionProvider");
  return ctx;
};
