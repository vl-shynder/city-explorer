import * as Location from "expo-location";
import { useEffect } from "react";
import { useLocationStore } from "../store";

export const useLocationRequest = () => {
  const { setLocationGranted } = useLocationStore();
  const [backgroundStatus, requestBackground] =
    Location.useBackgroundPermissions();

  useEffect(() => {
    setLocationGranted(backgroundStatus?.granted ?? false);
    if (!backgroundStatus?.granted) {
      requestBackground();
    }
  }, [backgroundStatus]);
};
