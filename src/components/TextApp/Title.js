import React from "react";
import Default from "./Default";

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

const Title = (props) => {
  return <Default fontSize="42" fontFamily="bold" {...props} style={{ ...props.style, fontWeight: "700" }} />;
};

Title.propTypes = {
  ...Default.propTypes,
};

export default Title;
