import { Link } from "expo-router";
import { Button, H1, H4, YStack } from "tamagui";
import { ScreenWrapper } from "../components";

export const HelloScreen = () => {
  return (
    <ScreenWrapper>
      <YStack gap="$5" flex={1} justifyContent="flex-end">
        <YStack alignItems="center">
          <H1>City Explorer</H1>
          <H4>Discover hidden gems in the city</H4>
        </YStack>
        <Link asChild href="/(onboarding)/(auth)/sign-in">
          <Button>Start</Button>
        </Link>
      </YStack>
    </ScreenWrapper>
  );
};
