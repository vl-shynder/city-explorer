import * as Location from "expo-location";
import { router, Tabs } from "expo-router";
import { useEffect } from "react";
import { LocationPermissionsScreen } from "../../screens";

export default function TabsLayout() {
  const [backgroundStatus, requestBackground] =
    Location.useBackgroundPermissions();

  useEffect(() => {
    if (!backgroundStatus?.granted) {
      requestBackground();
      router.replace("/(tabs)");
    }
  }, [backgroundStatus]);

  if (!backgroundStatus?.granted) {
    return <LocationPermissionsScreen />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false, unmountOnBlur: true }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="map" />
    </Tabs>
  );
}
