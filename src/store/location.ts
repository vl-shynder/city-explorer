import { Region } from "react-native-maps";
import { create } from "zustand";

type LocationState = {
  locationGranted: boolean;
  setLocationGranted: (granted: boolean) => void;

  currentLocation: Region | null;
  //   startListener:
};

export const useLocationStore = create<LocationState>((set) => ({
  locationGranted: false,

  currentLocation: null,

  setLocationGranted: (status: boolean) => {
    set({ locationGranted: status });
  },
}));
