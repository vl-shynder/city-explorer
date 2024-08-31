import * as Location from "expo-location";
import { create } from "zustand";

type LocationState = {
  locationGranted: boolean;
  setLocationGranted: (granted: boolean) => void;

  currentLocation: Location.LocationObject | null;
  startLocationListener: () => void;
  stopLocationListener: () => void;

  listenerRemove: Location.LocationSubscription | null;
};

export const useLocationStore = create<LocationState>((set, get) => ({
  locationGranted: false,

  currentLocation: null,

  setLocationGranted: (status: boolean) => {
    set({ locationGranted: status });
  },

  startLocationListener: async () => {
    const unsubscribe = await Location.watchPositionAsync(
      {
        distanceInterval: 0.5,
      },
      (location) => {
        set({ currentLocation: location });
      }
    );
    set({ listenerRemove: unsubscribe });
  },
  stopLocationListener: () => {
    const state = get();
    if (state.listenerRemove) {
      state.listenerRemove.remove();
    }
    set({ listenerRemove: null });
  },

  listenerRemove: null,
}));
