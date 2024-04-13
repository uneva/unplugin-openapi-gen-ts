import type { UnpluginFactory } from "unplugin";
import type { ResolvedConfig } from "vite";
import type { Config, InputPath } from "@kubb/core";
import type { Options } from "./types";

import { LogLevel, createLogger } from "@kubb/core/logger";
import { createUnplugin } from "unplugin";
import { safeBuild } from "@kubb/core";
import process from "node:process";
import path from "node:path";

export const defineUnplugin: UnpluginFactory<Options | undefined> = (options) => {
    const name = "unplugin-openapi-gen-ts" as const;
    const logger = createLogger({ name, logLevel: LogLevel.info });
    const setupLogger = (config: ResolvedConfig) => (message: string) => config.logger.info(`${name}: ${message}`);

    async function setup() {
        if (!options?.config) throw new Error("No config provided");

        const { root, ...userConfig } = options.config as Config<InputPath>;

        logger.emit("start", "🚀 Building");

        const { error } = await safeBuild({
            config: {
                root: process.cwd(),
                ...userConfig,
                output: {
                    write: true,
                    clean: true,
                    ...userConfig.output,
                },
            },
        });

        if (error) throw error;
    }

    return {
        name,
        enforce: "pre",
        vite: {
            configResolved(config) {
                logger.on("start", setupLogger(config));
                logger.on("end", setupLogger(config));
                logger.on("warning", setupLogger(config));
                logger.on("error", setupLogger(config));
            },
        },
        async buildStart() {
            await setup();
        },
        async watchChange(id) {
            if (!options?.config) throw new Error("No config provided");

            const { input } = options.config as Config<InputPath>;
            const dir = path.resolve(process.cwd(), input.path);

            if (dir !== id) return;

            await setup();
        },
    };
};

export const unplugin = createUnplugin(defineUnplugin);

export default unplugin;
