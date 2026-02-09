import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type AccentColor = "coral" | "blue" | "purple" | "orange" | "teal";

interface AccentConfig {
  label: string;
  light: { accent: string; "accent-foreground": string };
  dark: { accent: string; "accent-foreground": string };
  preview: string; // tailwind gradient for preview swatch
}

export const ACCENT_COLORS: Record<AccentColor, AccentConfig> = {
  coral: {
    label: "Coral",
    light: { accent: "0 70% 72%", "accent-foreground": "0 0% 100%" },
    dark: { accent: "0 90% 70%", "accent-foreground": "228 44% 10%" },
    preview: "bg-[#F76C6C]",
  },
  blue: {
    label: "Blue",
    light: { accent: "225 87% 60%", "accent-foreground": "0 0% 100%" },
    dark: { accent: "225 87% 67%", "accent-foreground": "0 0% 100%" },
    preview: "bg-[#374785]",
  },
  purple: {
    label: "Purple",
    light: { accent: "270 60% 60%", "accent-foreground": "0 0% 100%" },
    dark: { accent: "270 60% 70%", "accent-foreground": "228 44% 10%" },
    preview: "bg-[#9B59B6]",
  },
  orange: {
    label: "Orange",
    light: { accent: "25 90% 58%", "accent-foreground": "0 0% 100%" },
    dark: { accent: "25 90% 65%", "accent-foreground": "228 44% 10%" },
    preview: "bg-[#E67E22]",
  },
  teal: {
    label: "Teal",
    light: { accent: "174 60% 45%", "accent-foreground": "0 0% 100%" },
    dark: { accent: "174 60% 55%", "accent-foreground": "228 44% 10%" },
    preview: "bg-[#1ABC9C]",
  },
};

interface ThemeContextType {
  theme: Theme;
  accentColor: AccentColor;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("cityos-theme") as Theme) || "light";
    }
    return "light";
  });

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("cityos-accent") as AccentColor) || "coral";
    }
    return "coral";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("cityos-theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const config = ACCENT_COLORS[accentColor];
    const values = theme === "dark" ? config.dark : config.light;
    root.style.setProperty("--accent", values.accent);
    root.style.setProperty("--accent-foreground", values["accent-foreground"]);
    localStorage.setItem("cityos-accent", accentColor);
  }, [accentColor, theme]);

  const toggleTheme = () => setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  const setTheme = (t: Theme) => setThemeState(t);
  const setAccentColor = (c: AccentColor) => setAccentColorState(c);

  return (
    <ThemeContext.Provider value={{ theme, accentColor, toggleTheme, setTheme, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
