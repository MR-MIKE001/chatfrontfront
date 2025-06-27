import { create } from "zustand";

export const useThemes = create((set) => {
  return {
    theme: localStorage.getItem("chat-theme") || "dark",

    setTheme: (theme) => {
      localStorage.setItem("chat-theme", theme);
      set({ theme: theme });
    },
  };
});
