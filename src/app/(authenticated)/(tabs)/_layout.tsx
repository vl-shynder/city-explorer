import { Tabs } from "expo-router";
import { useLocationRequest } from "../../../hooks/use-location-request.hook";
import { LocationPermissionsScreen } from "../../../screens";
import { useLocationStore } from "../../../store";

export default function TabsLayout() {
  useLocationRequest();
  const { locationGranted } = useLocationStore();

  if (!locationGranted) {
    return <LocationPermissionsScreen />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false, unmountOnBlur: true }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="map" />
    </Tabs>
  );
}
