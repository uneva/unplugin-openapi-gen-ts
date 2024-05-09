import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import unpluginOpenapiGenTS from "unplugin-openapi-gen-ts/vite";
import { pluginSwagger } from "@kubb/swagger";
import { pluginTs } from "@kubb/swagger-ts";

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
                    pluginSwagger({ output: false }),
                    pluginTs({ output: { path: "models" } }),
                ],
            },
        }),
    ],
});
