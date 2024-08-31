import { ActivityIndicator } from "react-native";
import { View } from "tamagui";
import { EditProfileForm } from "../../../../components";
import { useUserProfile } from "../../../../hooks";

export default function Details() {
  const { profile, loading } = useUserProfile();

  if (loading) {
    return <ActivityIndicator />;
  }
  if (!profile) {
    return null;
  }
  return (
    <View flex={1} marginVertical="$5">
      <EditProfileForm profile={profile} />
    </View>
  );
}
