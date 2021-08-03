/* eslint-disable react-native/no-unused-styles */
import React from "react";
import { StyleSheet } from "react-native";
import { useTheme, Button, Colors } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";
import * as otherFamilyFont from "@assets/styles/fontFamily";
import BaseFontSize from "@assets/styles/fontSize";

/**
 * @typedef { "contained" | "outline" } Mode
 */

/**
 * Component of Text
 *
 * @param {object} props
 * @param {Mode} props.mode - Mode Button
 * @param {string} props.title - Title Button
 * @param {string} props.color - Background Button
 * @param {number} props.size - Padding inside to Button
 * @returns
 */

const Default = ({ children, style, title, size = 18, mode = "contained", color, ...otherProps }) => {
  const theme = useTheme();
  const styles = {
    ...useStyle({ theme, isOutline: mode === "outline", color, size, disabled: otherProps.disabled }),
    ...useStyleUniversal(theme),
  };
  return (
    <Button {...otherProps} mode={mode} color={color} style={[style, styles.containerButton]}>
      {title || children}
    </Button>
  );
};

Default.propTypes = {
  ...Button.propTypes,
};

const useStyle = ({ theme, isOutline = false, color, size, disabled }) =>
  StyleSheet.create({
    containerButton: {
      paddingVertical: size,
      borderRadius: 16,
      ...BaseFontSize.size18,
      ...otherFamilyFont.regular.main,
      ...(isOutline && {
        borderColor: disabled ? Colors.grey400 : color ?? theme.colors.primary,
        borderWidth: 2,
        paddingVertical: size / 1.1, // Se agrego esto aquí para que cuando esté en outline, tenga el mismo tamaño
      }),
    },
  });

export default Default;
