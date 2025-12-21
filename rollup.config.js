import typescript from "@rollup/plugin-typescript";
import autoExports from "rollup-plugin-auto-exports";
import { glob, rmdir, unlink } from "fs/promises";

const dir = "exports";

let result = await Array.fromAsync(glob(`${dir}/**/*.*`));
await Promise.all(
  result.map(async (file) => {
    await unlink(file, { recursive: true });
  })
);

result = await Array.fromAsync(glob(`${dir}/**/*`));
await Promise.all(
  result.map(async (file) => {
    await rmdir(file);
  })
);

export default {
  input: await Array.fromAsync(glob("src/**/*.ts")),
  output: {
    dir,
    format: "es",
  },
  plugins: [
    typescript(),
    autoExports({
      defaultExports: {
        ".": {
          import: "./exports/debug.js",
          types: "./exports/debug.d.ts",
        },
      },
    }),
  ],
};
