import * as turf from "@turf/turf";
import { Feature, GeoJsonProperties, Polygon } from "geojson";
import { Polygon as MyPoligon } from "../types";

export function mergeIntersectingPolygons(polygons: MyPoligon[]): MyPoligon[] {
  if (polygons.length === 0) {
    return [];
  }

  const turfPolygons = polygons.map(toTurfPolygon);
  const mergedPolygons: Feature<Polygon>[] = [];
  const usedIndices: Set<number> = new Set();

  function mergePolygons(indexes: number[]): Feature<Polygon> | null {
    if (indexes.length === 0) return null;

    let resultPolygon = turfPolygons[indexes[0]];
    for (let i = 1; i < indexes.length; i++) {
      const nextPolygon = turfPolygons[indexes[i]];
      if (
        turf.booleanOverlap(resultPolygon, nextPolygon) ||
        turf.booleanContains(resultPolygon, nextPolygon) ||
        turf.booleanContains(nextPolygon, resultPolygon)
      ) {
        const tmp = turf.union(
          turf.featureCollection([resultPolygon, nextPolygon])
        ) as Feature<Polygon, GeoJsonProperties>;
        if (tmp) {
          resultPolygon = tmp;
        }
      }
    }
    return resultPolygon;
  }

  for (let i = 0; i < turfPolygons.length; i++) {
    if (usedIndices.has(i)) continue;

    let groupIndexes: number[] = [i];
    for (let j = i + 1; j < turfPolygons.length; j++) {
      if (usedIndices.has(j)) continue;
      if (
        turf.booleanOverlap(turfPolygons[i], turfPolygons[j]) ||
        turf.booleanContains(turfPolygons[i], turfPolygons[j]) ||
        turf.booleanContains(turfPolygons[j], turfPolygons[i])
      ) {
        groupIndexes.push(j);
        usedIndices.add(j);
      }
    }
    usedIndices.add(i);

    const merged = mergePolygons(groupIndexes);
    if (merged) {
      mergedPolygons.push(merged);
    }
  }

  // Convert merged polygons back to custom format
  return mergedPolygons.map(toCustomPolygon);
}

function ensureClosed(polygon: MyPoligon): MyPoligon {
  if (
    polygon.length > 0 &&
    (polygon[0].latitude !== polygon[polygon.length - 1].latitude ||
      polygon[0].longitude !== polygon[polygon.length - 1].longitude)
  ) {
    return [...polygon, { ...polygon[0] }];
  }
  return polygon;
}

function toTurfPolygon(polygon: MyPoligon): Feature<Polygon> {
  const closedPolygon = ensureClosed(polygon);
  return turf.polygon([
    closedPolygon.map((coord) => [coord.longitude, coord.latitude]),
  ]);
}

function toCustomPolygon(turfPolygon: Feature<Polygon>): MyPoligon {
  return turfPolygon.geometry.coordinates[0].map(([longitude, latitude]) => ({
    latitude,
    longitude,
  }));
}
