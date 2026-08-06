import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Context API is used here — not for tasks — because theme is
// genuinely global, ambient state: dozens of unrelated components
// (sidebar, cards, dialog) all need to know "light or dark" and
// none of them are related by a data flow, so prop-drilling it
// down through the tree would pollute every intermediate
// component's props for no reason.

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Reflect theme onto <html> so Tailwind's `dark:` variant applies
  // globally, including to elements mounted outside React's root.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook wrapping useContext: gives every consumer a clear
// error instead of a silent `undefined` if it's ever rendered
// outside the provider.
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
