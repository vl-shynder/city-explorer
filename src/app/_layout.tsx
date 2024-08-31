import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { Slot, useRouter, useSegments } from "expo-router";

import { useColorScheme } from "react-native";

import { useEffect } from "react";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../../tamagui.config";
import { useAuthStateListener } from "../hooks";
import { useAuth } from "../store";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const segment = useSegments();
  const router = useRouter();

  useAuthStateListener();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const isAuthRoute = segment[0] === "(authenticated)";

    if (!isSignedIn && isAuthRoute) {
      router.replace("/(onboarding)");
    } else if (isSignedIn && !isAuthRoute) {
      router.replace("/(authenticated)");
    }
  }, [isSignedIn]);

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
