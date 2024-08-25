// import "ts-node/register"; // Add this to import TypeScript files
import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "city-exporer",
  slug: "city-exporer",
  ios: {
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
    bundleIdentifier: "com.cityexplorer.app",
  },
  android: {
    package: "com.cityexplorer.app",
  },
});
