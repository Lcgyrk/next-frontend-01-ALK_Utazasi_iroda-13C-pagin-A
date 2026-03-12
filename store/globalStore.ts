import { create } from "zustand";
import { persist } from "zustand/middleware";

type GlobalState = {
  id: number | null;
  actualPage: number;
  numberOfRecords: number;
  numberOfPages: number;
  searchTerm: string;
};

type GlobalStore = {
  gs: GlobalState;
  set: <K extends keyof GlobalState>(key: K, value: GlobalState[K]) => void;
  setId: (newId: number | null) => void;
};

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set) => ({
      gs: {
        id: null,
        actualPage: 1,
        numberOfRecords: 0,
        numberOfPages: 1,
        searchTerm: "",
      },
      set: (key, value) =>
        set((state) => ({
          gs: { ...state.gs, [key]: value },
        })),
      setId: (newId) =>
        set((state) => ({
          gs: { ...state.gs, id: newId },
        })),
    }),
    { name: "global-store" },
  ),
);
// persist használata miatt a store állapota megmarad a böngésző újraindításakor is
