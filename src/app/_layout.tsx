import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { router, Slot } from "expo-router";

import { useColorScheme } from "react-native";

import { useEffect } from "react";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../../tamagui.config";
import { useAuthUser } from "../hooks";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const { user } = useAuthUser();

  useEffect(() => {
    if (user) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(onboarding)");
    }
  }, [user]);

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
