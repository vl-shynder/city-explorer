import * as Location from "expo-location";
import { Button, H2, Spacer, Text, useWindowDimensions, YStack } from "tamagui";
import { ScreenWrapper } from "../components";

export const LocationPermissionsScreen = () => {
  const { height } = useWindowDimensions();

  const onAllowAccess = async () => {
    await Location.requestBackgroundPermissionsAsync();
  };

  return (
    <ScreenWrapper>
      <YStack gap="$2">
        <H2>Location Permission</H2>
        <Text>Location is required for this app to work</Text>
        <Spacer height={height / 2} />
        <Button onPress={onAllowAccess}>Allow location access</Button>
      </YStack>
    </ScreenWrapper>
  );
};
