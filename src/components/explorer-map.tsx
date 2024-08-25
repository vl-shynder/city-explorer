import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Location from "expo-location";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Polygon, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { View } from "tamagui";
import { silverMapStyle } from "../constants";
import { Coord } from "../types";
import {
  generatePolygonAroundCoords,
  mergeIntersectingPolygons,
} from "../utils";

export const ExplorerMap = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [holes, setHoles] = useState<Array<Coord[]>>([]);
  const mapRef = useRef<MapView>(null);

  const userLocation = useMemo((): Region | undefined => {
    if (!location) {
      return undefined;
    }
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.02,
    };
  }, [location]);

  const zoomToUserLocation = () => {
    if (userLocation) {
      mapRef.current?.animateToRegion(userLocation);
    }
  };

  useEffect(() => {
    const unsubPromise = Location.watchPositionAsync(
      {
        distanceInterval: 0.5,
      },
      (location) => {
        console.log("location");
        setLocation(location);
      }
    );

    return () => {
      unsubPromise.then((usub) => () => {
        console.log("unsubscribing");
        usub.remove();
      });
    };
  }, []);
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
    <View flex={1} backgroundColor={"grey"}>
      {userLocation && (
        <View flex={1}>
          <MapView
            ref={mapRef}
            style={styles.map}
            customMapStyle={silverMapStyle}
            provider={PROVIDER_GOOGLE}
            initialRegion={userLocation}
            showsUserLocation
            // onRegionChange={(region, details) => {
            //   // region.
            //   // console.log({ region, details });
            // }}
          >
            {holes.map((hole, i) => (
              <Polygon
                coordinates={hole}
                key={i}
                fillColor="rgba(0, 0, 0, 0.5)"
                strokeColor="rgba(0, 0, 0, 0)"
              />
            ))}
          </MapView>
          <View
            position="absolute"
            bottom="$2"
            right="$2"
            backgroundColor="white"
            padding="$2"
            borderRadius="$2"
          >
            <TouchableOpacity onPress={zoomToUserLocation}>
              <FontAwesome5 name="location-arrow" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
