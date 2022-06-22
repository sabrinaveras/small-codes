import { color } from "./color";
import { typography } from "./typography";

export const theme = {
    colors: color,
    typography: typography,
    shape: {
      borderRadius: (factor: number) => `${factor}rem`,
    },
  };
  