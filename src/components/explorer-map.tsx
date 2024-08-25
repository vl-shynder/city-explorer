import * as Location from "expo-location";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polygon, Region } from "react-native-maps";
import { Coord } from "../types";
import {
  generatePolygonAroundCoords,
  mergeIntersectingPolygons,
} from "../utils";

const fullWorldFOG = [
  { latitude: -90, longitude: -180 },
  { latitude: 90, longitude: -180 },
  { latitude: 90, longitude: 0 },
  { latitude: 90, longitude: 179.9 },
  { latitude: -90, longitude: 179.9 },
];

export const ExplorerMap = () => {
  const [locationGranted, setLocationGranted] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [holes, setHoles] = useState<Array<Coord[]>>([]);

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
  useEffect(() => {
    if (userLocation) {
      setHoles((prevHoles) => {
        const newHoles = [
          ...prevHoles,
          generatePolygonAroundCoords(userLocation, 8, 0.1),
        ];
        if (newHoles.length < 2) {
          return newHoles;
        }
        // if (newHoles.length > 2) {
        //   console.log("Too much polygons");
        //   return newHoles;
        // }
        return mergeIntersectingPolygons(newHoles);
      });
    }
  }, [userLocation]);
  return (
    <View style={styles.container}>
      {userLocation && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={userLocation}
            onRegionChange={(region, details) => {
              // region.
              // console.log({ region, details });
            }}
          >
            {userLocation && <Marker coordinate={userLocation} />}
            {holes.map((hole, i) => (
              <Polygon
                coordinates={hole}
                key={i}
                fillColor="rgba(0, 0, 0, 0.5)"
                strokeColor="rgba(0, 0, 0, 0)"
              />
            ))}
          </MapView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
