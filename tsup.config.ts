import { defineConfig } from "tsup";
import { forceDefaultExport } from "./src/utils";

export default defineConfig({
    entry: ["src/*.ts"],
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    async onSuccess() {
        await forceDefaultExport();
    },
});
