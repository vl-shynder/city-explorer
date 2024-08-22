import { Coord } from "../types";

export function generatePolygonAroundCoords(
  center: Coord,
  numEdges: number,
  radius: number
): Coord[] {
  const { latitude: centerLat, longitude: centerLng } = center;
  const coordinates: Coord[] = [];

  // Convert degrees to radians
  const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

  // Convert radians to degrees
  const radiansToDegrees = (radians: number) => radians * (180 / Math.PI);

  // Earth's radius in kilometers
  const earthRadius = 6371;

  // Calculate the angle between each point
  const angleIncrement = (2 * Math.PI) / numEdges;

  for (let i = 0; i < numEdges; i++) {
    const angle = angleIncrement * i;

    // Calculate the latitude and longitude of each point
    const latitude = Math.asin(
      Math.sin(degreesToRadians(centerLat)) * Math.cos(radius / earthRadius) +
        Math.cos(degreesToRadians(centerLat)) *
          Math.sin(radius / earthRadius) *
          Math.cos(angle)
    );

    const longitude =
      degreesToRadians(centerLng) +
      Math.atan2(
        Math.sin(angle) *
          Math.sin(radius / earthRadius) *
          Math.cos(degreesToRadians(centerLat)),
        Math.cos(radius / earthRadius) -
          Math.sin(degreesToRadians(centerLat)) * Math.sin(latitude)
      );

    // Convert radians back to degrees
    coordinates.push({
      latitude: radiansToDegrees(latitude),
      longitude: radiansToDegrees(longitude),
    });
  }

  return coordinates;
}
