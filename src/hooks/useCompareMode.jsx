import { createContext, useCallback, useContext, useEffect, useState } from "react";
import cohort from "../data/generated/cohort.live.json";
import { MIN_N_GLOBAL } from "../data/generated/_thresholds";

const STORAGE_KEY = "gtm.compareMode";

const CompareContext = createContext({
  enabled: false,
  on: false,
  toggle: () => {},
  cohort,
  reason: "disabled",
});

export function CompareProvider({ children }) {
  const enabled = (cohort?.n ?? 0) >= MIN_N_GLOBAL;
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "1") setOn(true);
    } catch {
      /* localStorage unavailable; default off */
    }
  }, [enabled]);

  const toggle = useCallback(() => {
    setOn((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const reason = !enabled
    ? cohort?.n > 0
      ? "below_global_threshold"
      : "no_data"
    : "ready";

  return (
    <CompareContext.Provider value={{ enabled, on: enabled && on, toggle, cohort, reason }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompareMode() {
  return useContext(CompareContext);
}
