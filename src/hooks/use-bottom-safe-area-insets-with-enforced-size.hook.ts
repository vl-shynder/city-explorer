import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useBottomSafeAreaInsetsWithEnforcedSize = (min = 16) => {
  const { bottom } = useSafeAreaInsets();

  return bottom + 16;
};
