"use client";

import { createContext, useContext } from "react";
import type { RoleId } from "./constants";

// Which role edition is being shown: null for the general site.
const RoleContext = createContext<RoleId | null>(null);

export function RoleProvider({ role, children }: { role: RoleId | null; children: React.ReactNode }) {
  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
}

export function useRole(): RoleId | null {
  return useContext(RoleContext);
}
