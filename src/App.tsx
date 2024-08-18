import * as Location from "expo-location";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

export default function App() {
  const [locationGranted, setLocationGranted] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const userLocation = useMemo((): Region | undefined => {
    if (!location) {
      return undefined;
    }
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }, [location]);

  useEffect(() => {
    const init = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      setLocationGranted(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (locationGranted) {
      const usubPromise = Location.watchPositionAsync(
        {
          // accuracy: Location.Accuracy.BestForNavigation,
          // timeInterval: 500,
          distanceInterval: 0.5,
        },
        (location) => {
          setLocation(location);
        }
      );

      return () => {
        usubPromise.then((usub) => () => {
          usub.remove();
        });
      };
    }
  }, [locationGranted]);
  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          style={styles.map}
          initialRegion={userLocation}
          // onRegionChange={(region, details) => {
          //   console.log({ region, details });
          // }}
        >
          {userLocation && <Marker coordinate={userLocation} />}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
