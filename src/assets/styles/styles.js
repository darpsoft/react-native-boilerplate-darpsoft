import { StyleSheet } from "react-native";

export const useStyleUniversal = (theme) => {
  return StyleSheet.create({
    containers: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
