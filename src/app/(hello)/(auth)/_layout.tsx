import { Slot } from "expo-router";
import { H1, H4, Spacer, YStack } from "tamagui";
import { ScreenWrapper } from "../../../components";

export default function AuthLayout() {
  return (
    <ScreenWrapper>
      <YStack flex={1} gap="$10">
        <Spacer height="$10" />
        <YStack gap="$2" alignItems="center">
          <H1>City Explorer</H1>
          <H4>Discover the city with City Explorer!</H4>
        </YStack>
      </YStack>
      <Slot />
    </ScreenWrapper>
  );
}
