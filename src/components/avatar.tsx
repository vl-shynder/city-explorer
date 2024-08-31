import Ionicons from "@expo/vector-icons/Ionicons";
import { FC } from "react";
import { Image } from "tamagui";
import { AvatarSizeVariants } from "../constants";
import { AvatarSizeVariant } from "../types";

type AvatarProps = {
  url?: string;
  size?: AvatarSizeVariant;
  color?: string;
};

export const Avatar: FC<AvatarProps> = ({
  url,
  size = "small",
  color = "black",
}) => {
  if (!url) {
    return (
      <Ionicons
        name="person-circle-outline"
        size={AvatarSizeVariants[size]}
        color={color}
      />
    );
  }
  return (
    <Image
      source={{ uri: url }}
      width={AvatarSizeVariants[size]}
      height={AvatarSizeVariants[size]}
    />
  );
};
