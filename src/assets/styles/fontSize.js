import { StyleSheet, Dimensions, PixelRatio } from "react-native";
const fontScale = PixelRatio.getFontScale();
const { width } = Dimensions.get("window");

calculateSize = (size) => {
  let sizeFont = 0;
  if (width >= 401 && width <= 420) {
    sizeFont = size * 1;
  } else if (width >= 381 && width <= 400) {
    sizeFont = size * 0.96;
  } else if (width >= 361 && width <= 380) {
    sizeFont = size * 0.92;
  } else if (width >= 341 && width <= 360) {
    sizeFont = size * 0.88;
  } else if (width >= 321 && width <= 340) {
    sizeFont = size * 0.83;
  } else if (width >= 301 && width <= 320) {
    sizeFont = Math.round(size * 0.8);
  }

  if (fontScale >= 1.7) {
    return sizeFont - sizeFont * (fontScale - 1.35);
  } else if (fontScale >= 1.6) {
    return sizeFont - sizeFont * (fontScale - 1.25);
  } else if (fontScale >= 1.5) {
    return sizeFont - sizeFont * (fontScale - 1.2);
  } else if (fontScale >= 1.1) {
    return sizeFont - sizeFont * (fontScale - 1.1);
  } else {
    return sizeFont;
  }
};

const BaseStyles = StyleSheet.create({
  size10: {
    fontSize: calculateSize(10),
  },
  size12: {
    fontSize: calculateSize(12),
  },
  size13: {
    fontSize: calculateSize(13),
  },
  size14: {
    fontSize: calculateSize(14),
  },
  size16: {
    fontSize: calculateSize(16),
  },
  size18: {
    fontSize: calculateSize(18),
  },
  size20: {
    fontSize: calculateSize(20),
  },
  size22: {
    fontSize: calculateSize(22),
  },
  size24: {
    fontSize: calculateSize(24),
  },
  size26: {
    fontSize: calculateSize(26),
  },
  size28: {
    fontSize: calculateSize(28),
  },
  size30: {
    fontSize: calculateSize(30),
  },
  size32: {
    fontSize: calculateSize(32),
  },
  size42: {
    fontSize: calculateSize(42),
  },
  size70: {
    fontSize: calculateSize(70),
  },
});

export default BaseStyles;
