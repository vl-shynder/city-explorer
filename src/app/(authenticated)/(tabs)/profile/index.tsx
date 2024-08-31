import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Group, H2, ListItem, Spacer, YStack } from "tamagui";
import { Avatar, ScreenWrapper } from "../../../../components";
import { useAuth } from "../../../../store";

export default function Profile() {
  const { signOut, profile } = useAuth();
  console.log(profile);

  const fullName = profile?.first_name
    ? `${profile?.first_name} ${profile?.last_name}`
    : "Anonymous";

  return (
    <ScreenWrapper>
      <YStack flex={1} justifyContent="space-between">
        <YStack>
          <YStack alignItems="center">
            <Avatar size="large" />
            <H2>{fullName}</H2>
          </YStack>
          <Spacer height="$2" />
          <YStack>
            <Group orientation="vertical">
              <Group.Item>
                <Link href="/(authenticated)/(tabs)/profile/progress">
                  <ListItem title="Progress" />
                </Link>
              </Group.Item>
              <Group.Item>
                <Link href="/(authenticated)/(tabs)/profile/details">
                  <ListItem title="Update profile" />
                </Link>
              </Group.Item>
            </Group>
          </YStack>
        </YStack>
        <TouchableOpacity onPress={signOut}>
          <ListItem title="Sign Out" />
        </TouchableOpacity>
      </YStack>
    </ScreenWrapper>
  );
}
