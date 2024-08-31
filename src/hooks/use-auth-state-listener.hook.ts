import { useEffect } from "react";
import { useAuth } from "../store";

export const useAuthStateListener = () => {
  const { setAuthStateListener, unusbcribeAuthStateListener } = useAuth();

  useEffect(() => {
    setAuthStateListener();

    return unusbcribeAuthStateListener;
  }, []);
};
