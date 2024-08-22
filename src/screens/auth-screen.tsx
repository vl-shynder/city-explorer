import { Button, H1, H4, Input, Spacer, YStack } from "tamagui";
import { ScreenWrapper } from "../components";

export const AuthScreen = () => {
  return (
    <ScreenWrapper>
      <YStack flex={1} gap="$10">
        <Spacer height="$10" />
        <YStack gap="$2" alignItems="center">
          <H1>City Explorer</H1>
          <H4>Discover the city with City Explorer!</H4>
        </YStack>
        <YStack gap="$4">
          <Input placeholder="Enter your email" />
          <Input placeholder="***********" />
        </YStack>
        <YStack>
          <Button>Join</Button>
        </YStack>
      </YStack>
    </ScreenWrapper>
  );
};
