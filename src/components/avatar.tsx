import Ionicons from "@expo/vector-icons/Ionicons";
import { FC } from "react";
import { Image } from "tamagui";
import { AvatarSizeVariants } from "../constants";
import { AvatarSizeVariant } from "../types";

type AvatarProps = {
  url?: string;
  size?: AvatarSizeVariant;
};

export const Avatar: FC<AvatarProps> = ({ url, size = "small" }) => {
  if (!url) {
    return (
      <Ionicons
        name="person-circle-outline"
        size={AvatarSizeVariants[size]}
        color="black"
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
