import React, { useMemo } from "react";
import { TextPropTypes, Text } from "react-native";
import PropTypes from "prop-types";

import Base, * as otherFamilyFont from "@assets/styles/fontFamily";
import BaseFontSize from "@assets/styles/fontSize";
import { useTheme } from "react-native-paper";

const getFontSize = (fontSize) => {
  return BaseFontSize[`size${fontSize}`] ?? BaseFontSize.size16;
};

const getFontFamily = (fontFamily) => {
  return otherFamilyFont[fontFamily] ?? Base;
};

/**
 * @typedef {"10" | "12" | "13" | "14" | "16" | "18" | "20" | "22" | "24" | "26" | "28" | "30" | "32" | "42" | "70"} FontSize
 * @typedef { "regular" | "light" | "bold" | "extraBold" | "semiBold" | "medium" | "black" } FontFamily
 */

/**
 * Component of Text
 *
 * @param {object} props
 * @param {FontSize} props.fontSize - Font Size, Ejem: "16", "18", "20", ... "70"
 * @param {FontFamily} props.fontFamily - Font Family, Ejem: "regular", "light", "bold", etc
 * @param {string} props.color - Color fonts
 * @returns
 */

const Default = ({ style, children, fontSize = "16", fontFamily = "bold", color = "", ...otherProps }) => {
  const fontSizeSelected = useMemo(() => getFontSize(fontSize), [fontSize]);
  const fontFamilySelected = useMemo(() => getFontFamily(fontFamily), [fontFamily]);
  const theme = useTheme();
  return (
    <Text {...otherProps} style={[{ color: color !== "" ? color : theme.colors.text }, style, fontFamilySelected.main, fontSizeSelected]}>
      {children}
    </Text>
  );
};

Default.propTypes = {
  ...TextPropTypes,
  fontSize: PropTypes.oneOf(["10", "12", "13", "14", "16", "18", "20", "22", "24", "26", "28", "30", "32", "42", "70"]),
  fontFamily: PropTypes.oneOf(["regular", "light", "bold", "extraBold", "semiBold", "medium", "black"]),
};

export default Default;
