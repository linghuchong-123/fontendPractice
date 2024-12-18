import { parse } from "@babel/parser";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    swc({
      jsc: {
        parse: {
          syntax: "typescript",
          decorators: true,
        },
        transform: {
          legacyDecorator: true,
          decoratorsLegacy: true,
        },
      },
    }),
  ],
});
