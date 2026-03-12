import { create } from "zustand";

// Define the shape of the global state
type GlobalStateData = {
  numberOfRecords: number;
  numberOfPages: number;
  actualPage: number;
  searchTerm: string;
};

type GlobalStore = {
  gs: GlobalStateData;
  set: <K extends keyof GlobalStateData>(key: K, value: GlobalStateData[K]) => void;
};

export const useGlobalStore = create<GlobalStore>()((set) => ({
  // Initialize the global state:
  gs: {
    numberOfRecords: 0,
    numberOfPages: 0,
    actualPage: 1,
    searchTerm: "",
  },

  set: (key, value) =>
    set((state) => ({
      gs: {
        ...state.gs,
        [key]: value,
      },
    })),
}));
