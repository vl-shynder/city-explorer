import { useEffect } from "react";
import { useLocationStore } from "../store";

export const useLocationSubscription = () => {
  const { startLocationListener, stopLocationListener } = useLocationStore();

  useEffect(() => {
    startLocationListener();
    return stopLocationListener;
  }, []);
};
