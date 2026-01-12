"use client";

import { useEffect, useState } from "react";

import styles from "./ThemeToggle.module.scss";

type Theme = "light" | "dark";

const THEME_EVENT = "examstop:theme";

function getCurrentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const fromDom = document.documentElement.dataset.theme;
  return fromDom === "dark" ? "dark" : "light";
}

function subscribeThemeChange(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const handler = () => onStoreChange();
  window.addEventListener(THEME_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(THEME_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // ignore write failures (e.g. privacy mode)
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(THEME_EVENT));
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(getCurrentTheme());
    return subscribeThemeChange(() => setTheme(getCurrentTheme()));
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        applyTheme(next);
      }}
      aria-label="Toggle theme"
      className={styles.toggle}
    >
      <span className={styles.pill}>{theme === "dark" ? "Dark" : "Light"}</span>
      <span>{theme === "dark" ? "Switch to Light" : "Switch to Dark"}</span>
    </button>
  );
}
