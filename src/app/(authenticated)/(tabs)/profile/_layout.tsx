import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="details"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen name="progress" options={{ headerShown: false }} />
    </Stack>
  );
}
