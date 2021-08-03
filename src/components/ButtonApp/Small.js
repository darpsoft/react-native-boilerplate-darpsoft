import React from "react";
import Default from "./Default";

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
 * @returns
 */

const Small = (props) => {
  return <Default size={10} {...props} />;
};

Small.propTypes = {
  ...Default.propTypes,
};

export default Small;
