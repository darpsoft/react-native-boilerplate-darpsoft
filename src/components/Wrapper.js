/* eslint-disable react-native/no-unused-styles */
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";

export const Wrapper = ({ children, style, withFlex = true, scrollview = true }) => {
  const theme = useTheme();
  const styles = { ...useStyle(theme), ...useStyleUniversal(theme) };
  return (
    <View style={[styles.containerWrapper, style]}>
      {scrollview ? (
        <ScrollView contentContainerStyle={[styles.containerScrollView, withFlex && { flex: 1 }]} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.containerScrollView, withFlex && { flex: 1 }]}>{children}</View>
      )}
    </View>
  );
};

const useStyle = (theme) =>
  StyleSheet.create({
    containerWrapper: {
      flex: 1,
    },
    containerScrollView: {
      paddingHorizontal: 16,
    },
  });

export default Wrapper;
