import typescript from "@rollup/plugin-typescript";

export default {
  input: "debug.ts",
  output: {
    file: "exports/debug.js",
    format: "es",
  },
  plugins: [typescript()],
};
