import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import unpluginOpenapiGenTS from "unplugin-openapi-gen-ts/vite";
import { definePlugin as createSwagger } from "@kubb/swagger";
import { definePlugin as createSwaggerTS } from "@kubb/swagger-ts";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        unpluginOpenapiGenTS({
            config: {
                input: {
                    path: "./apis/openapi.yaml",
                },
                output: {
                    path: "./src/interface",
                    clean: true,
                },
                plugins: [
                    createSwagger({ output: false }),
                    createSwaggerTS({ output: { path: "models" } }),
                ],
            },
        }),
    ],
});
