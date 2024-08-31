import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Avatar } from "../../../components";
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
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="map-o" size={20} color={color} />
          ),
          title: "Map",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <Avatar size="small" color={color} />,
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
