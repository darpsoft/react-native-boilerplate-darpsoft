import React, { memo } from "react";
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import TextApp from "@components/TextApp";

/**
 * @typedef { "center" | "flex-end" | "flex-start" } TitleAlign
 */

/**
 * Header Default of App
 *
 * @param {object} params
 * @param {function} params.pressButtonLeft
 * @param {function} params.pressButtonRight
 * @param {string} params.title
 * @param {string} params.iconLeft
 * @param {string} params.iconRight
 * @param {string} params.iconLeftColor
 * @param {string} params.iconRightColor
 * @param {TitleAlign} params.titleAlign
 * @returns
 */

export const HeaderApp = ({
  pressButtonLeft,
  pressButtonRight,
  title,
  iconLeft = "arrow-left",
  iconRight = "bell-outline",
  titleAlign = "center",
  iconLeftColor,
  iconRightColor,
}) => {
  const theme = useTheme();
  return (
    <View style={{ height: 60, flexDirection: "row", paddingHorizontal: 16 }}>
      {pressButtonLeft && (
        <View style={{ flex: 1, height: 60, justifyContent: "center", alignItems: "flex-start" }}>
          <IconButton
            icon={iconLeft}
            size={25}
            onPress={pressButtonLeft}
            color={iconLeftColor ?? theme.colors.text}
            style={{ marginLeft: -12 }}
          />
        </View>
      )}
      <View style={{ flex: 6, justifyContent: "center", alignItems: titleAlign }}>
        <TextApp.Default fontSize="30" style={{ color: theme.colors.primary, fontWeight: "700" }} numberOfLines={1}>
          {title}
        </TextApp.Default>
      </View>
      <View style={{ flex: 1, height: 60, justifyContent: "center", alignItems: "flex-end" }}>
        {pressButtonRight && (
          <IconButton
            icon={iconRight}
            size={25}
            onPress={pressButtonRight}
            color={iconRightColor ?? theme.colors.text}
            style={{ marginRight: -12 }}
          />
        )}
      </View>
    </View>
  );
};

const HeaderAppWithMemo = memo(HeaderApp);
HeaderAppWithMemo.displayName = "HeaderApp";

export default HeaderAppWithMemo;
