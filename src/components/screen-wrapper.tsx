import { FC, PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "tamagui";

export const ScreenWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View flex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <View flex={1} padding="$5">
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
};
