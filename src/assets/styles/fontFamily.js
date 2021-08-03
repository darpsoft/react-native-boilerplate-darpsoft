import { StyleSheet } from "react-native";

const BaseStyles = StyleSheet.create({
  main: {
    fontFamily: "",
  },
});

const regular = StyleSheet.create({
  main: {
    fontFamily: "Lato-Regular",
  },
});
const light = StyleSheet.create({
  main: {
    fontFamily: "Lato-Light",
  },
});
const bold = StyleSheet.create({
  main: {
    fontFamily: "Lato-Bold",
  },
});
const extraBold = StyleSheet.create({
  main: {
    fontFamily: "Lato-Bold",
  },
});
const semiBold = StyleSheet.create({
  main: {
    fontFamily: "Lato-Bold",
  },
});
const medium = StyleSheet.create({
  main: {
    fontFamily: "Lato-Thin",
  },
});
const black = StyleSheet.create({
  main: {
    fontFamily: "Lato-Black",
  },
});

export default BaseStyles;
export { regular, light, bold, extraBold, semiBold, medium, black };
