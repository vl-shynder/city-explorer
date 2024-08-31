import { Button, Text } from "tamagui";
import { ScreenWrapper } from "../../../components";
import { useAuth } from "../../../store";

export default function Profile() {
  const { signOut } = useAuth();
  return (
    <ScreenWrapper>
      <Text>Profile</Text>
      <Button onPress={signOut}>Sign Out</Button>
    </ScreenWrapper>
  );
}
