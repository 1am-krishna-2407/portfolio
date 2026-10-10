"use client";

import { useSyncExternalStore } from "react";

// Tiny shared UI state so the top bar, footer and overlays can talk without
// wrapping the (server-rendered) page in a context provider.
interface UiState {
  tldr: boolean;
  terminal: boolean;
  hired: boolean;
  assistant: boolean;
}

let state: UiState = { tldr: false, terminal: false, hired: false, assistant: false };
const listeners = new Set<() => void>();

export function setUi(patch: Partial<UiState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const serverState: UiState = { tldr: false, terminal: false, hired: false, assistant: false };

export function useUi<K extends keyof UiState>(key: K): UiState[K] {
  return useSyncExternalStore(
    subscribe,
    () => state[key],
    () => serverState[key]
  );
}
