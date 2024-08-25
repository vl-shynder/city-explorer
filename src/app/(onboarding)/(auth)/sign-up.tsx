import { Link, router } from "expo-router";
import { H4, Spacer, Text, View } from "tamagui";
import { AuthForm } from "../../../components";

export default function SignUpScreen() {
  return (
    <View>
      <H4>Create a new account</H4>
      <Spacer height="$2" />
      <AuthForm
        type="sign-up"
        onSuccess={() => {
          router.replace("/(auth)/sign-in");
        }}
      />
      <Text paddingTop="$2">
        Alread have an account?{" "}
        <Link href="/(onboarding)/(auth)/sign-in">Sign In</Link>
      </Text>
    </View>
  );
}
