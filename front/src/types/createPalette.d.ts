import * as createPalette from "@material-ui/core/styles/createPalette";
declare module "@material-ui/core/styles/createPalette" {
  interface PaletteOptions {
    basic?: PaletteColorOptions;
  }
  interface Palette {
    basic: PaletteColor;
  }
}
