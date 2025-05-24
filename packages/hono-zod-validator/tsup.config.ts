import type { Options } from "tsup";

import { defineConfig } from "tsup";

const options: Options = {
    entry: {
        index: "./src/index.ts",
    },
    sourcemap: true,
    clean: true,
    outDir: "./dist",
    platform: "neutral",
    tsconfig: "./tsconfig.json",
};

export default defineConfig([
    {
        ...options,
        format: "esm",
    },
    {
        ...options,
        format: "cjs",
        dts: true,
    },
]);
