/* eslint-disable react-native/no-unused-styles */
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TextInput } from "react-native";
import { useTheme } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";
import * as otherFamilyFont from "@assets/styles/fontFamily";
import BaseFontSize from "@assets/styles/fontSize";

/**
 * Component of TextInput
 *
 * @param {object} props
 * @param {boolean} props.error If exist at error
 * @param {boolean} props.withRef If used with forwardRef
 * @returns
 */

const Default = ({ style, error, withRef = false, backgroundColor, ...otherProps }, ref) => {
  const theme = useTheme();
  const styles = { ...useStyle(theme, error, backgroundColor), ...useStyleUniversal(theme) };
  // Esto es por si se implementa con forwardRef, la idea es no agregar el ref
  const propsForRef = withRef ? { ref } : {};
  return (
    <TextInput {...otherProps} {...propsForRef} style={[style, styles.containerTextInput, style?.height && { height: style.height }]} />
  );
};

Default.propTypes = {
  ...TextInput.prototype,
  error: PropTypes.bool,
};

const useStyle = (theme, error, backgroundColor) =>
  StyleSheet.create({
    containerTextInput: {
      padding: 16,
      height: 64,
      borderRadius: 18,
      borderColor: error ? theme.colors.danger : theme.colors.surface,
      borderWidth: 1,
      backgroundColor: backgroundColor,
      ...BaseFontSize.size18,
      ...otherFamilyFont.regular.main,
    },
  });

export default Default;
