import { forwardRef } from "react";
import Default from "./Default";

export default forwardRef((props, ref) => Default({ ...props, withRef: true }, ref));
